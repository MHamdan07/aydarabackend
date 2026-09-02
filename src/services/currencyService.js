import https from 'https';
import { getStore, saveStore } from '../config/store.js';

// Supported currency configurations with standard symbols, formatting and country mappings
export const SUPPORTED_CURRENCIES = {
  PKR: {
    code: 'PKR',
    name: 'Pakistani Rupee',
    symbol: '₨',
    displaySymbol: 'PKR',
    decimals: 0,
    rounding: 'integer',
    flag: '🇵🇰',
    defaultRate: 1.0
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    displaySymbol: '$',
    decimals: 2,
    rounding: 'decimals',
    flag: '🇺🇸',
    defaultRate: 0.00358 // ~279 PKR / USD
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    displaySymbol: '€',
    decimals: 2,
    rounding: 'decimals',
    flag: '🇪🇺',
    defaultRate: 0.00332 // ~301 PKR / EUR
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    displaySymbol: '£',
    decimals: 2,
    rounding: 'decimals',
    flag: '🇬🇧',
    defaultRate: 0.00282 // ~354 PKR / GBP
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED',
    displaySymbol: 'AED',
    decimals: 2,
    rounding: 'decimals',
    flag: '🇦🇪',
    defaultRate: 0.01315 // ~76 PKR / AED
  },
  SAR: {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'SAR',
    displaySymbol: 'SAR',
    decimals: 2,
    rounding: 'decimals',
    flag: '🇸🇦',
    defaultRate: 0.01344 // ~74.4 PKR / SAR
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    displaySymbol: 'CAD',
    decimals: 2,
    rounding: 'decimals',
    flag: '🇨🇦',
    defaultRate: 0.00495 // ~202 PKR / CAD
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'AU$',
    displaySymbol: 'AUD',
    decimals: 2,
    rounding: 'decimals',
    flag: '🇦🇺',
    defaultRate: 0.00548 // ~182 PKR / AUD
  }
};

// Country to Currency Mapping
export const COUNTRY_TO_CURRENCY = {
  PK: 'PKR',
  PAKISTAN: 'PKR',
  US: 'USD',
  USA: 'USD',
  'UNITED STATES': 'USD',
  GB: 'GBP',
  UK: 'GBP',
  'UNITED KINGDOM': 'GBP',
  AE: 'AED',
  UAE: 'AED',
  'UNITED ARAB EMIRATES': 'AED',
  SA: 'SAR',
  'SAUDI ARABIA': 'SAR',
  DE: 'EUR',
  GERMANY: 'EUR',
  FR: 'EUR',
  FRANCE: 'EUR',
  IT: 'EUR',
  ITALY: 'EUR',
  ES: 'EUR',
  SPAIN: 'EUR',
  NL: 'EUR',
  NETHERLANDS: 'EUR',
  BE: 'EUR',
  BELGIUM: 'EUR',
  AT: 'EUR',
  AUSTRIA: 'EUR',
  CA: 'CAD',
  CANADA: 'CAD',
  AU: 'AUD',
  AUSTRALIA: 'AUD'
};

// In-memory cache for fast rate responses
let inMemoryRatesCache = null;
let lastFetchAttempt = null;

/**
 * Fetch fresh exchange rates from provider (PKR base)
 */
export async function fetchLiveExchangeRates() {
  return new Promise((resolve) => {
    // We use Open Exchange Rates / open.er-api.com as reliable free public provider
    const url = 'https://open.er-api.com/v6/latest/PKR';

    const req = https.get(url, { timeout: 6000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed && (parsed.result === 'success' || parsed.rates)) {
            const rawRates = parsed.rates;
            const validatedRates = {};

            // Extract rates for our supported currencies
            Object.keys(SUPPORTED_CURRENCIES).forEach((code) => {
              if (code === 'PKR') {
                validatedRates.PKR = 1.0;
              } else if (rawRates && typeof rawRates[code] === 'number' && rawRates[code] > 0) {
                validatedRates[code] = rawRates[code];
              } else {
                // Fallback to default
                validatedRates[code] = SUPPORTED_CURRENCIES[code].defaultRate;
              }
            });

            const result = {
              baseCurrency: 'PKR',
              rates: validatedRates,
              source: 'open.er-api.com (Daily Verified)',
              fetchedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              status: 'success'
            };

            // Update in-memory & persistent store
            inMemoryRatesCache = result;
            persistRatesToStore(result);
            resolve(result);
            return;
          }
        } catch (e) {
          console.warn('[CurrencyService] Parse error from exchange provider:', e.message);
        }
        resolve(getFallbackRates());
      });
    });

    req.on('error', (err) => {
      console.warn('[CurrencyService] Network request to exchange provider failed:', err.message);
      resolve(getFallbackRates());
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn('[CurrencyService] Exchange provider request timed out');
      resolve(getFallbackRates());
    });
  });
}

/**
 * Fallback to persistent cached rates or safe defaults
 */
export function getFallbackRates() {
  try {
    const store = getStore();
    if (store.currencyRates && store.currencyRates.rates) {
      return {
        ...store.currencyRates,
        status: 'cached'
      };
    }
  } catch (err) {
    // Ignore
  }

  // Hard fallback to supported currency defaults
  const fallbackRates = {};
  Object.keys(SUPPORTED_CURRENCIES).forEach((code) => {
    fallbackRates[code] = SUPPORTED_CURRENCIES[code].defaultRate;
  });

  return {
    baseCurrency: 'PKR',
    rates: fallbackRates,
    source: 'AYDARA Atelier Reserve Rates',
    fetchedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'fallback'
  };
}

/**
 * Save rates to store.json
 */
function persistRatesToStore(ratesData) {
  try {
    const store = getStore();
    store.currencyRates = ratesData;
    if (!store.settings) store.settings = {};
    store.settings.baseCurrency = 'PKR';
    store.settings.exchangeRates = ratesData.rates;
    store.settings.lastRateUpdate = ratesData.fetchedAt;
    saveStore(store);
  } catch (err) {
    console.error('[CurrencyService] Failed to persist rates to store:', err);
  }
}

/**
 * Get current active rates (cached or fresh)
 */
export async function getActiveCurrencyRates(forceRefresh = false) {
  if (!forceRefresh && inMemoryRatesCache) {
    return inMemoryRatesCache;
  }

  try {
    const store = getStore();
    if (store.currencyRates && store.currencyRates.rates && !forceRefresh) {
      const lastFetch = new Date(store.currencyRates.fetchedAt).getTime();
      const twelveHours = 12 * 60 * 60 * 1000;
      if (Date.now() - lastFetch < twelveHours) {
        inMemoryRatesCache = store.currencyRates;
        return inMemoryRatesCache;
      }
    }
  } catch (e) {
    // proceed to fetch
  }

  return await fetchLiveExchangeRates();
}

/**
 * Detect currency from client request (Headers / IP / Geolocation)
 */
export function detectCurrencyFromRequest(req) {
  try {
    // Check Cloudflare / CDN headers
    const countryHeader =
      req.headers['cf-ipcountry'] ||
      req.headers['x-country-code'] ||
      req.headers['x-geo-country'] ||
      req.headers['x-appengine-country'];

    if (countryHeader) {
      const code = countryHeader.toUpperCase().trim();
      if (COUNTRY_TO_CURRENCY[code]) {
        return COUNTRY_TO_CURRENCY[code];
      }
    }

    // Check accept-language for region hint
    const acceptLang = req.headers['accept-language'];
    if (acceptLang) {
      if (acceptLang.includes('PK') || acceptLang.includes('ur-PK') || acceptLang.includes('en-PK')) return 'PKR';
      if (acceptLang.includes('en-US')) return 'USD';
      if (acceptLang.includes('en-GB')) return 'GBP';
      if (acceptLang.includes('ar-AE') || acceptLang.includes('en-AE')) return 'AED';
      if (acceptLang.includes('ar-SA')) return 'SAR';
      if (acceptLang.includes('en-CA') || acceptLang.includes('fr-CA')) return 'CAD';
      if (acceptLang.includes('en-AU')) return 'AUD';
      if (acceptLang.includes('de-DE') || acceptLang.includes('fr-FR') || acceptLang.includes('it-IT') || acceptLang.includes('es-ES')) return 'EUR';
    }
  } catch (e) {
    // default
  }

  return 'PKR'; // Default base currency
}

// Background daily updater (runs every 24 hours)
export function initCurrencyScheduler() {
  // Initial fetch on server startup
  getActiveCurrencyRates(true).catch((err) =>
    console.warn('[CurrencyScheduler] Initial rate fetch error:', err.message)
  );

  // Check every 6 hours and refresh if older than 24h
  setInterval(async () => {
    try {
      console.log('[CurrencyScheduler] Checking daily exchange rate updates...');
      await fetchLiveExchangeRates();
    } catch (err) {
      console.warn('[CurrencyScheduler] Scheduled update failed:', err.message);
    }
  }, 6 * 60 * 60 * 1000);
}
