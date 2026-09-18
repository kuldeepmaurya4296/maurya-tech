import { cache } from 'react';
import connectToDatabase from '@/lib/mongodb';
import Tool from '@/lib/models/Tool';
import { defaultTools } from '@/data/tools';

export const getToolBySlug = cache(async (slug, countryCode = 'IN') => {
  const normalizedCountry = (countryCode || 'IN').toUpperCase();

  try {
    await connectToDatabase();
    const dbTool = await Tool.findOne({ slug, enabled: true }).lean();
    if (dbTool) {
      if (isToolAvailableForCountry(dbTool, normalizedCountry)) {
        return dbTool;
      }
    }
  } catch (err) {
    console.warn('Tool DB lookup fallback:', err.message);
  }

  const fallback = defaultTools.find((t) => t.slug === slug && t.enabled);
  if (fallback && isToolAvailableForCountry(fallback, normalizedCountry)) {
    return fallback;
  }

  return null;
});

export const getToolsForCountry = cache(async (countryCode = 'IN') => {
  const normalizedCountry = (countryCode || 'IN').toUpperCase();

  try {
    await connectToDatabase();
    const dbTools = await Tool.find({ enabled: true, status: 'published' }).lean();
    if (dbTools && dbTools.length > 0) {
      const filtered = dbTools.filter((t) => isToolAvailableForCountry(t, normalizedCountry));
      if (filtered.length > 0) return filtered;
    }
  } catch (err) {
    console.warn('Tools list DB lookup fallback:', err.message);
  }

  return defaultTools.filter((t) => t.enabled && isToolAvailableForCountry(t, normalizedCountry));
});

function isToolAvailableForCountry(tool, countryCode) {
  if (tool.scope === 'GLOBAL') return true;
  if (Array.isArray(tool.countries)) {
    return tool.countries.map((c) => c.toUpperCase()).includes(countryCode);
  }
  return true;
}
