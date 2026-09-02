import { getStore, saveStore } from '../config/store.js';
import { logActivity } from './adminController.js';

export const createOrder = (req, res) => {
  try {
    const {
      items,
      customer,
      shippingAddress,
      paymentMethod,
      currency: orderCurrency,
      customerNotes
    } = req.body;

    if (!items || !items.length || !customer || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Invalid order payload' });
    }

    const store = getStore();
    const baseCurrency = store.settings?.baseCurrency || 'PKR';
    const selectedCurrency = orderCurrency || baseCurrency;

    // Current verified exchange rate
    const activeRates = store.currencyRates?.rates || store.settings?.exchangeRates || { PKR: 1 };
    const exchangeRate = typeof activeRates[selectedCurrency] === 'number' ? activeRates[selectedCurrency] : 1;

    let calculatedSubtotalBase = 0;
    const validatedItems = [];

    // Authoritative item snapshotting and stock deduction
    for (const item of items) {
      const product = store.products.find(p => p.id === item.productId || p.slug === item.productId);
      
      // Stock management
      if (product) {
        product.stock = Math.max(0, (product.stock || 10) - (item.quantity || 1));
      }

      // Unit price snapshot (honoring custom stitched option price or product base)
      const unitPriceBase = typeof item.price === 'number' && item.price > 0
        ? item.price
        : (product?.salePrice || product?.price || 185000);

      const unitPriceDisplayed = Math.round((unitPriceBase * exchangeRate) * 100) / 100;
      const itemTotalBase = unitPriceBase * (item.quantity || 1);
      const itemTotalDisplayed = Math.round((itemTotalBase * exchangeRate) * 100) / 100;

      calculatedSubtotalBase += itemTotalBase;

      validatedItems.push({
        productId: product?.id || item.productId || `prod-${Date.now()}`,
        name: item.name || product?.name || 'AYDARA Haute Creation',
        slug: item.slug || product?.slug || 'creation',
        image: item.image || product?.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200',
        size: item.size || 'Standard',
        color: item.color || (product?.colors?.[0]?.name || 'Standard'),
        stitchingOption: item.stitchingOption || '3pc Stitched (Standard)',
        quantity: item.quantity || 1,
        unitPriceBase,
        unitPriceDisplayed,
        priceBase: unitPriceBase,
        priceDisplayed: unitPriceDisplayed,
        price: unitPriceDisplayed,
        totalBase: itemTotalBase,
        totalDisplayed: itemTotalDisplayed,
        total: itemTotalDisplayed
      });
    }

    const freeShippingThresholdBase = store.settings?.shipping?.freeShippingThreshold || 300000;
    const standardFeeBase = store.settings?.shipping?.standardFee || 0;

    const shippingFeeBase = calculatedSubtotalBase >= freeShippingThresholdBase ? 0 : standardFeeBase;
    const shippingFeeDisplayed = Math.round((shippingFeeBase * exchangeRate) * 100) / 100;

    const grandTotalBase = calculatedSubtotalBase + shippingFeeBase;
    const grandTotalDisplayed = Math.round((grandTotalBase * exchangeRate) * 100) / 100;

    // Unique Luxury Order Number format: AYD-321696
    const orderNumber = `AYD-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowIso = new Date().toISOString();

    const initialHistory = [
      {
        status: 'Pending',
        changedBy: customer.name || 'Client',
        timestamp: nowIso,
        note: 'Acquisition submitted via luxury checkout.'
      }
    ];

    const initialProductionChecklist = [
      { id: 'chk-1', label: 'Fabric allocated', completed: false },
      { id: 'chk-2', label: 'Measurements confirmed', completed: false },
      { id: 'chk-3', label: 'Cutting completed', completed: false },
      { id: 'chk-4', label: 'Stitching completed', completed: false },
      { id: 'chk-5', label: 'Hand finishing & embroidery inspection', completed: false },
      { id: 'chk-6', label: 'Quality checked', completed: false },
      { id: 'chk-7', label: 'Product packed in luxury Maison box', completed: false }
    ];

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customer: {
        id: req.user?.id || `cust-${Date.now()}`,
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '+92 300 1234567'
      },
      shippingAddress: {
        street: shippingAddress.street || shippingAddress.address || '',
        area: shippingAddress.area || '',
        city: shippingAddress.city || 'Karachi',
        province: shippingAddress.province || shippingAddress.state || 'Sindh',
        postalCode: shippingAddress.postalCode || '75500',
        country: shippingAddress.country || 'Pakistan',
        specialInstructions: shippingAddress.specialInstructions || customerNotes || ''
      },
      items: validatedItems,
      // Auditable Financial Snapshot
      baseCurrency,
      currency: selectedCurrency,
      exchangeRate,
      subtotalBase: calculatedSubtotalBase,
      subtotalDisplayed: Math.round((calculatedSubtotalBase * exchangeRate) * 100) / 100,
      subtotal: Math.round((calculatedSubtotalBase * exchangeRate) * 100) / 100,
      shippingBase: shippingFeeBase,
      shippingDisplayed: shippingFeeDisplayed,
      shippingFee: shippingFeeDisplayed,
      totalBase: grandTotalBase,
      totalDisplayed: grandTotalDisplayed,
      total: grandTotalDisplayed,
      paymentMethod: paymentMethod || 'Online Payment',
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      status: 'Confirmed', // Lifecycle: Pending -> Confirmed -> Processing -> Ready to Ship -> Shipped -> Out for Delivery -> Delivered -> Completed
      shippingDetails: {
        courier: 'DHL Express',
        trackingNumber: '',
        shippingDate: '',
        expectedDeliveryDate: ''
      },
      productionChecklist: initialProductionChecklist,
      statusHistory: initialHistory,
      adminNotes: [],
      createdAt: nowIso,
      updatedAt: nowIso
    };

    store.orders.unshift(newOrder);
    logActivity(store, 'Client Acquisition', `New Order placed #${orderNumber}`, `${validatedItems.length} creations (PKR ${grandTotalBase.toLocaleString()})`);
    saveStore(store);

    res.status(201).json({
      success: true,
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = (req, res) => {
  try {
    const store = getStore();
    res.json({
      success: true,
      count: store.orders.length,
      orders: store.orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = (req, res) => {
  try {
    const store = getStore();
    const userEmail = (req.user?.email || '').toLowerCase();
    const userId = req.user?.id;
    const userOrders = (store.orders || []).filter(o => 
      (o.customer?.email && o.customer.email.toLowerCase() === userEmail) ||
      o.userId === userId ||
      o.customer?.id === userId
    );
    res.json({
      success: true,
      count: userOrders.length,
      orders: userOrders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const trackOrderByNumber = (req, res) => {
  try {
    const { orderNumber } = req.params;
    const store = getStore();
    const order = (store.orders || []).find(o => 
      o.orderNumber?.toLowerCase() === orderNumber?.toLowerCase() ||
      o.orderNumber?.replace('#', '').toLowerCase() === orderNumber?.replace('#', '').toLowerCase() ||
      o.id === orderNumber
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        shippingDetails: order.shippingDetails,
        statusHistory: order.statusHistory,
        items: order.items.map(i => ({
          name: i.name,
          image: i.image,
          size: i.size,
          stitchingOption: i.stitchingOption,
          quantity: i.quantity
        })),
        totalDisplayed: order.totalDisplayed,
        currency: order.currency
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = (req, res) => {
  try {
    const {
      status,
      paymentStatus,
      note,
      courier,
      trackingNumber,
      shippingDate,
      expectedDeliveryDate,
      cancellationReason,
      productionChecklist
    } = req.body;

    const store = getStore();
    const order = store.orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const nowIso = new Date().toISOString();
    const adminName = req.user?.name || 'AYDARA Directrice';

    if (status && status !== order.status) {
      const prevStatus = order.status;
      order.status = status;

      // If transitioning to Delivered or Completed, record delivered timestamp and settle payment
      if (['Delivered', 'Completed'].includes(status)) {
        if (!order.shippingDetails) order.shippingDetails = {};
        order.shippingDetails.deliveredAt = nowIso;
        if (order.paymentStatus === 'Pending') {
          order.paymentStatus = 'Paid';
        }
      }

      // If cancelling from an active state, restore inventory stock
      if (status === 'Cancelled' && prevStatus !== 'Cancelled') {
        if (order.items && order.items.length) {
          for (const it of order.items) {
            const prod = (store.products || []).find(p => p.id === it.productId);
            if (prod) {
              prod.stock = (prod.stock || 0) + (it.quantity || 1);
            }
          }
        }
      }

      if (!order.statusHistory) order.statusHistory = [];
      order.statusHistory.push({
        status,
        previousStatus: prevStatus,
        changedBy: adminName,
        timestamp: nowIso,
        note: note || `Status transitioned from ${prevStatus} to ${status}.`
      });
    }

    if (paymentStatus) order.paymentStatus = paymentStatus;

    if (courier || trackingNumber || shippingDate || expectedDeliveryDate) {
      order.shippingDetails = {
        ...(order.shippingDetails || {}),
        ...(courier ? { courier } : {}),
        ...(trackingNumber ? { trackingNumber } : {}),
        ...(shippingDate ? { shippingDate } : {}),
        ...(expectedDeliveryDate ? { expectedDeliveryDate } : {})
      };
    }

    if (cancellationReason) {
      order.cancellationReason = {
        reason: cancellationReason,
        note: note || '',
        timestamp: nowIso,
        author: adminName
      };
    }

    if (productionChecklist) {
      order.productionChecklist = productionChecklist;
    }

    order.updatedAt = nowIso;
    logActivity(store, adminName, `Updated Order #${order.orderNumber}`, `Status: ${order.status} (${order.paymentStatus})`);
    saveStore(store);

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addOrderNote = (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: 'Note text required' });

    const store = getStore();
    const order = store.orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (!order.adminNotes) order.adminNotes = [];
    const newNote = {
      id: `note-${Date.now()}`,
      author: req.user?.name || 'AYDARA Directrice',
      text,
      timestamp: new Date().toISOString()
    };
    order.adminNotes.unshift(newNote);
    saveStore(store);

    res.json({ success: true, notes: order.adminNotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
