import { getStore, saveStore } from '../config/store.js';

export const getHomepage = (req, res) => {
  try {
    const store = getStore();
    res.json({
      success: true,
      homepage: store.homepage,
      version: store.homepage.updatedAt || new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHomepage = (req, res) => {
  try {
    const store = getStore();
    store.homepage = {
      ...store.homepage,
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    saveStore(store);

    res.json({
      success: true,
      message: 'Homepage CMS content updated successfully across all devices',
      homepage: store.homepage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
