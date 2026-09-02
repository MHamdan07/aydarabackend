import { getStore, saveStore } from '../config/store.js';
import { logActivity } from './adminController.js';

export const getProducts = (req, res) => {
  try {
    const store = getStore();
    let products = [...store.products];

    const { category, isNewArrival, isBestSeller, isFeatured, search, sort, status } = req.query;

    if (category) {
      products = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }
    if (isNewArrival === 'true') {
      products = products.filter(p => p.isNewArrival === true);
    }
    if (isBestSeller === 'true') {
      products = products.filter(p => p.isBestSeller === true);
    }
    if (isFeatured === 'true') {
      products = products.filter(p => p.isFeatured === true);
    }
    if (status) {
      products = products.filter(p => p.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) || 
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    if (sort === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'stock-asc') {
      products.sort((a, b) => a.stock - b.stock);
    } else if (sort === 'newest') {
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = (req, res) => {
  try {
    const store = getStore();
    const product = store.products.find(p => p.slug === req.params.slug || p.id === req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = (req, res) => {
  try {
    const store = getStore();
    const newProduct = {
      id: `prod-${Date.now()}`,
      slug: (req.body.slug || req.body.name || 'creation').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      status: req.body.status || 'published',
      stock: req.body.stock !== undefined ? Number(req.body.stock) : 10,
      variants: req.body.variants || [],
      sizeChart: req.body.sizeChart || null,
      ...req.body
    };

    store.products.unshift(newProduct);
    logActivity(store, req.user?.name || 'Administrator', 'Created new product creation', newProduct.name);
    saveStore(store);

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = (req, res) => {
  try {
    const store = getStore();
    const index = store.products.findIndex(p => p.id === req.params.id || p.slug === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    store.products[index] = {
      ...store.products[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    logActivity(store, req.user?.name || 'Administrator', 'Updated product details & sizing', store.products[index].name);
    saveStore(store);

    res.json({ success: true, product: store.products[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = (req, res) => {
  try {
    const store = getStore();
    const index = store.products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const deleted = store.products.splice(index, 1)[0];
    logActivity(store, req.user?.name || 'Administrator', 'Archived / Deleted product', deleted.name);
    saveStore(store);

    res.json({ success: true, message: 'Product removed from active catalog' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bulkUpdateProducts = (req, res) => {
  try {
    const { ids, action, value } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ success: false, message: 'Invalid product ids array' });
    }

    const store = getStore();
    store.products = store.products.map(p => {
      if (ids.includes(p.id)) {
        if (action === 'publish') return { ...p, status: 'published' };
        if (action === 'archive') return { ...p, status: 'archived' };
        if (action === 'setFeatured') return { ...p, isFeatured: value };
        if (action === 'setBestSeller') return { ...p, isBestSeller: value };
        if (action === 'setNewArrival') return { ...p, isNewArrival: value };
        if (action === 'setCategory') return { ...p, category: value };
      }
      return p;
    });

    logActivity(store, req.user?.name || 'Administrator', `Executed bulk action "${action}"`, `${ids.length} products`);
    saveStore(store);

    res.json({ success: true, message: `Successfully updated ${ids.length} products.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
