import { cache } from 'react';
import connectToDatabase from '@/lib/mongodb';
import Country from '@/lib/models/Country';
import { defaultCountries } from '@/data/countries';

/**
 * Returns the MarketProfile for a given country code (e.g. 'in', 'us', 'uk').
 * Wrapped in React cache to ensure only one lookup per request across Server Components and metadata.
 */
export const getMarketProfile = cache(async (countryCode) => {
  const normalized = (countryCode || 'in').toUpperCase();

  // Try DB first
  try {
    await connectToDatabase();
    const dbCountry = await Country.findOne({ code: normalized, enabled: true }).lean();
    if (dbCountry) {
      return buildMarketProfile(dbCountry);
    }
  } catch (err) {
    console.warn('MarketProfile DB lookup fallback:', err.message);
  }

  // Fallback to static seed data
  const fallback = defaultCountries.find(
    (c) => c.code === normalized && c.enabled
  ) || defaultCountries[0]; // fallback to India

  return buildMarketProfile(fallback);
});

/**
 * Returns all currently active and enabled countries.
 */
export const getEnabledCountries = cache(async () => {
  try {
    await connectToDatabase();
    const dbCountries = await Country.find({ enabled: true }).select('code name currency currencySymbol defaultLanguage launchTier').lean();
    if (dbCountries && dbCountries.length > 0) {
      return dbCountries.map((c) => ({
        code: c.code.toLowerCase(),
        name: c.name,
        currency: c.currency,
        currencySymbol: c.currencySymbol,
        defaultLanguage: c.defaultLanguage,
      }));
    }
  } catch (err) {
    console.warn('Enabled countries DB lookup fallback:', err.message);
  }

  return defaultCountries
    .filter((c) => c.enabled)
    .map((c) => ({
      code: c.code.toLowerCase(),
      name: c.name,
      currency: c.currency,
      currencySymbol: c.currencySymbol,
      defaultLanguage: c.defaultLanguage,
    }));
});

function buildMarketProfile(data) {
  const terminologyMap = data.terminology instanceof Map
    ? Object.fromEntries(data.terminology)
    : data.terminology || {};

  return {
    code: data.code.toUpperCase(),
    slug: data.code.toLowerCase(),
    name: data.name,
    enabled: data.enabled,
    currency: data.currency || 'USD',
    currencySymbol: data.currencySymbol || '$',
    defaultLanguage: data.defaultLanguage || 'en',
    supportedLanguages: data.supportedLanguages || ['en'],
    timezone: data.timezone || 'UTC',
    dateFormat: data.dateFormat || 'YYYY-MM-DD',
    numberFormat: data.numberFormat || 'en-US',
    terminology: terminologyMap,
    seoRules: data.seoRules || {},
    monetizationRules: data.monetizationRules || { adNetwork: 'none', affiliateNetworks: [] },
    launchTier: data.launchTier || 1,

    // Helper to get localized terminology
    term: (key, fallback = '') => terminologyMap[key] || fallback || key,

    // Formatting helpers
    formatCurrency: (amount) => {
      try {
        return new Intl.NumberFormat(data.numberFormat || 'en-US', {
          style: 'currency',
          currency: data.currency || 'USD',
          maximumFractionDigits: 0,
        }).format(amount || 0);
      } catch {
        return `${data.currencySymbol || '$'}${Number(amount || 0).toLocaleString()}`;
      }
    },

    formatNumber: (num) => {
      try {
        return new Intl.NumberFormat(data.numberFormat || 'en-US').format(num || 0);
      } catch {
        return Number(num || 0).toLocaleString();
      }
    },
  };
}
