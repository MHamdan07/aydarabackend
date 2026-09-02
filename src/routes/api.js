import express from 'express';
import { login, adminLogin, register, getMe, updateProfile, forgotPassword, resetPassword } from '../controllers/authController.js';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUpdateProducts
} from '../controllers/productController.js';
import {
  getCategories,
  updateCategories,
  getAdminStats,
  getCustomers,
  getActivityLogs
} from '../controllers/adminController.js';
import { getHomepage, updateHomepage } from '../controllers/homepageController.js';
import {
  getSettings,
  getAdminSettings,
  updateSettings,
  saveDraftSettings,
  publishSettings,
  discardDraftSettings,
  restoreSettingsVersion,
  flushCache,
  resetSettingsToDefault
} from '../controllers/settingsController.js';
import {
  createOrder,
  getOrders,
  getMyOrders,
  trackOrderByNumber,
  updateOrderStatus,
  addOrderNote
} from '../controllers/orderController.js';
import {
  getCurrencies,
  getCurrencyRates,
  getCurrencyConfig,
  getAdminCurrencies,
  updateCurrencyConfig,
  triggerRateUpdate
} from '../controllers/currencyController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import { upload, handleMediaUpload, getMediaList, deleteMedia } from '../controllers/mediaController.js';

const router = express.Router();

// Auth
router.post('/auth/login', login);
router.post('/auth/admin/login', adminLogin);
router.post('/auth/register', register);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.get('/auth/me', protect, getMe);
router.put('/customer/profile', protect, updateProfile);

// Products (Public & Admin)
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.post('/products', protect, requireAdmin, createProduct);
router.put('/products/:id', protect, requireAdmin, updateProduct);
router.delete('/products/:id', protect, requireAdmin, deleteProduct);
router.post('/admin/products/bulk', protect, requireAdmin, bulkUpdateProducts);

// Categories
router.get('/categories', getCategories);
router.put('/categories', protect, requireAdmin, updateCategories);

// Homepage CMS
router.get('/homepage', getHomepage);
router.put('/homepage', protect, requireAdmin, updateHomepage);

// Currency Management (Public & Admin)
router.get('/currencies', getCurrencies);
router.get('/currencies/rates', getCurrencyRates);
router.get('/currencies/config', getCurrencyConfig);
router.get('/admin/currencies', protect, requireAdmin, getAdminCurrencies);
router.put('/admin/currencies/config', protect, requireAdmin, updateCurrencyConfig);
router.post('/admin/currencies/update-rates', protect, requireAdmin, triggerRateUpdate);

// Global Maison Settings (Public & Admin)
router.get('/settings', getSettings);
router.get('/footer', getSettings);
router.get('/admin/settings', protect, requireAdmin, getAdminSettings);
router.put('/settings', protect, requireAdmin, updateSettings);
router.put('/admin/settings', protect, requireAdmin, updateSettings);
router.post('/admin/settings/draft', protect, requireAdmin, saveDraftSettings);
router.post('/admin/settings/publish', protect, requireAdmin, publishSettings);
router.post('/admin/settings/discard', protect, requireAdmin, discardDraftSettings);
router.post('/admin/settings/restore/:versionId', protect, requireAdmin, restoreSettingsVersion);
router.post('/admin/settings/flush-cache', protect, requireAdmin, flushCache);
router.post('/admin/settings/reset-defaults', protect, requireAdmin, resetSettingsToDefault);

// Orders Lifecycle & Tracking
router.post('/orders', createOrder);
router.get('/orders', protect, requireAdmin, getOrders);
router.get('/orders/my-orders', protect, getMyOrders);
router.get('/orders/track/:orderNumber', trackOrderByNumber);
router.put('/orders/:id', protect, requireAdmin, updateOrderStatus);
router.post('/orders/:id/notes', protect, requireAdmin, addOrderNote);

// Customers Directory & Activity Logs
router.get('/admin/customers', protect, requireAdmin, getCustomers);
router.get('/admin/activity-logs', protect, requireAdmin, getActivityLogs);

// Universal Media Upload & Media Library
const uploadFieldHandler = (req, res, next) => {
  const uploadAny = upload.any();
  uploadAny(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (req.files && req.files.length > 0) {
      req.file = req.files[0];
    }
    next();
  });
};

router.post('/admin/media/upload', protect, requireAdmin, uploadFieldHandler, handleMediaUpload);
router.post('/media/upload', uploadFieldHandler, handleMediaUpload);
router.get('/admin/media', protect, requireAdmin, getMediaList);
router.delete('/admin/media/:filename', protect, requireAdmin, deleteMedia);

// Admin Stats
router.get('/admin/stats', protect, requireAdmin, getAdminStats);

export default router;
