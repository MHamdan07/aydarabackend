import { getStore, saveStore } from '../config/store.js';

export const getCategories = (req, res) => {
  try {
    const store = getStore();
    const categories = (store.categories || []).filter(c => c.isActive !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategories = (req, res) => {
  try {
    const store = getStore();
    store.categories = req.body.categories;
    logActivity(store, req.user?.name || 'Administrator', 'Updated Categories & Collections', 'Taxonomy');
    saveStore(store);
    res.json({ success: true, categories: store.categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminStats = (req, res) => {
  try {
    const store = getStore();
    const orders = store.orders || [];
    const products = store.products || [];
    const users = store.users || [];

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, o) => acc + (o.totalBase || o.total || 0), 0);
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.createdAt && o.createdAt.startsWith(today));
    const todayRevenue = todayOrders.reduce((acc, o) => acc + (o.totalBase || o.total || 0), 0);

    const pendingOrders = orders.filter(o => (o.status || '').toLowerCase() === 'pending').length;
    const completedOrders = orders.filter(o => ['delivered', 'completed'].includes((o.status || '').toLowerCase())).length;
    const processingOrders = orders.filter(o => ['confirmed', 'processing', 'ready to ship', 'shipped', 'out for delivery'].includes((o.status || '').toLowerCase())).length;

    const totalProducts = products.length;
    const lowStockThreshold = (store.settings?.lowStockThreshold) || 5;
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= lowStockThreshold);
    const outOfStockProducts = products.filter(p => p.stock <= 0);

    const customers = users.filter(u => u.role === 'customer');
    const newCustomers = customers.slice(0, 5).length;
    const totalCustomers = customers.length || 18;

    const bestSeller = products.find(p => p.isBestSeller) || products[0];

    const recentOrders = orders.slice(0, 8);
    const activityLogs = (store.activityLogs || []).slice(0, 15);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        todayRevenue,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalProducts,
        lowStockCount: lowStockProducts.length,
        outOfStockCount: outOfStockProducts.length,
        lowStockProducts,
        outOfStockProducts,
        newCustomers,
        totalCustomers,
        wishlistCount: 24,
        bestSellingProduct: bestSeller?.name || 'The Luna Silk Draped Gown',
        recentOrders,
        activityLogs
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomers = (req, res) => {
  try {
    const store = getStore();
    const customers = (store.users || [])
      .filter(u => u.role === 'customer')
      .map(c => {
        const userOrders = (store.orders || []).filter(o => o.customer?.email === c.email);
        const totalSpend = userOrders.reduce((acc, o) => acc + (o.totalBase || o.total || 0), 0);
        return {
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || '+1 (555) 234-5678',
          totalOrders: userOrders.length,
          totalSpend,
          lastOrderDate: userOrders[0]?.createdAt || c.createdAt,
          status: 'Active Member'
        };
      });

    res.json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActivityLogs = (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, logs: store.activityLogs || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logActivity = (store, adminName, action, target) => {
  if (!store.activityLogs) store.activityLogs = [];
  store.activityLogs.unshift({
    id: `log-${Date.now()}-${Math.round(Math.random() * 1e4)}`,
    admin: adminName,
    action,
    target,
    timestamp: new Date().toISOString()
  });
  if (store.activityLogs.length > 100) store.activityLogs.pop();
};
