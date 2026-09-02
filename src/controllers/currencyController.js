import {
  SUPPORTED_CURRENCIES,
  COUNTRY_TO_CURRENCY,
  getActiveCurrencyRates,
  fetchLiveExchangeRates,
  detectCurrencyFromRequest
} from '../services/currencyService.js';
import { getStore, saveStore } from '../config/store.js';

/**
 * Public: Get currencies overview & current rates & detected currency
 * GET /api/v1/currencies
 */
export const getCurrencies = async (req, res) => {
  try {
    const store = getStore();
    const ratesData = await getActiveCurrencyRates();
    const detectedCurrency = detectCurrencyFromRequest(req);

    const baseCurrency = store.settings?.baseCurrency || 'PKR';
    const enabledCurrencies = store.settings?.enabledCurrencies || Object.keys(SUPPORTED_CURRENCIES);
    const roundingRules = store.settings?.currencyRounding || {
      PKR: 'integer',
      USD: 'decimals',
      EUR: 'decimals',
      GBP: 'decimals',
      AED: 'decimals',
      SAR: 'decimals',
      CAD: 'decimals',
      AUD: 'decimals'
    };

    res.json({
      success: true,
      baseCurrency,
      detectedCurrency,
      supportedCurrencies: SUPPORTED_CURRENCIES,
      enabledCurrencies,
      roundingRules,
      rates: ratesData.rates,
      source: ratesData.source,
      fetchedAt: ratesData.fetchedAt,
      updatedAt: ratesData.updatedAt,
      status: ratesData.status
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Public: Get current exchange rates
 * GET /api/v1/currencies/rates
 */
export const getCurrencyRates = async (req, res) => {
  try {
    const ratesData = await getActiveCurrencyRates();
    res.json({
      success: true,
      baseCurrency: ratesData.baseCurrency || 'PKR',
      rates: ratesData.rates,
      fetchedAt: ratesData.fetchedAt,
      source: ratesData.source
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Public: Get currency configuration
 * GET /api/v1/currencies/config
 */
export const getCurrencyConfig = (req, res) => {
  try {
    const store = getStore();
    res.json({
      success: true,
      baseCurrency: store.settings?.baseCurrency || 'PKR',
      supportedCurrencies: SUPPORTED_CURRENCIES,
      countryMapping: COUNTRY_TO_CURRENCY,
      roundingRules: store.settings?.currencyRounding || {}
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Admin: Get detailed currency settings
 * GET /api/v1/admin/currencies
 */
export const getAdminCurrencies = async (req, res) => {
  try {
    const store = getStore();
    const ratesData = await getActiveCurrencyRates();

    res.json({
      success: true,
      baseCurrency: store.settings?.baseCurrency || 'PKR',
      supportedCurrencies: SUPPORTED_CURRENCIES,
      enabledCurrencies: store.settings?.enabledCurrencies || Object.keys(SUPPORTED_CURRENCIES),
      roundingRules: store.settings?.currencyRounding || {},
      ratesData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Admin: Update currency settings
 * PUT /api/v1/admin/currencies/config
 */
export const updateCurrencyConfig = (req, res) => {
  try {
    const { baseCurrency, enabledCurrencies, roundingRules } = req.body;
    const store = getStore();

    if (!store.settings) store.settings = {};
    if (baseCurrency) store.settings.baseCurrency = baseCurrency;
    if (enabledCurrencies) store.settings.enabledCurrencies = enabledCurrencies;
    if (roundingRules) store.settings.currencyRounding = roundingRules;
    store.settings.updatedAt = new Date().toISOString();

    saveStore(store);

    res.json({
      success: true,
      settings: {
        baseCurrency: store.settings.baseCurrency,
        enabledCurrencies: store.settings.enabledCurrencies,
        currencyRounding: store.settings.currencyRounding
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Admin: Force update exchange rates now
 * POST /api/v1/admin/currencies/update-rates
 */
export const triggerRateUpdate = async (req, res) => {
  try {
    const ratesData = await fetchLiveExchangeRates();
    res.json({
      success: true,
      message: 'Exchange rates updated successfully from live provider',
      ratesData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
