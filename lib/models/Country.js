import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    }, // 'IN', 'US', 'UK', 'CA', etc.
    name: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: false,
      index: true,
    },
    defaultLanguage: {
      type: String,
      default: 'en',
    },
    supportedLanguages: {
      type: [String],
      default: ['en'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    currencySymbol: {
      type: String,
      default: '$',
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    numberFormat: {
      type: String,
      default: 'en-US',
    },
    terminology: {
      type: Map,
      of: String,
      default: {},
    },
    seoRules: {
      hreflangGroup: { type: String, default: 'global' },
      defaultMetaTitle: { type: String, default: '' },
      defaultMetaDescription: { type: String, default: '' },
    },
    monetizationRules: {
      adNetwork: { type: String, default: 'none' },
      affiliateNetworks: { type: [String], default: [] },
    },
    launchTier: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Country || mongoose.model('Country', CountrySchema);
