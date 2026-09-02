import { getStore, saveStore } from '../config/store.js';

export const getLookbooks = (req, res) => {
  try {
    const store = getStore();
    res.json({
      success: true,
      lookbooks: store.lookbooks.filter(l => l.isPublished !== false).sort((a, b) => a.order - b.order)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLookbooks = (req, res) => {
  try {
    const store = getStore();
    store.lookbooks = req.body.lookbooks;
    saveStore(store);
    res.json({ success: true, lookbooks: store.lookbooks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
