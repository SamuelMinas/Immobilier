import { CITIES, PROPERTY_TYPES, type City, type PropertyFilters, type PropertyType } from "./properties";

export type AnnoncesSearch = PropertyFilters;

export function validateAnnoncesSearch(s: Record<string, unknown>): AnnoncesSearch {
  const out: AnnoncesSearch = {};
  if (typeof s["q"] === "string" && s["q"].trim()) out.q = s["q"];
  if (s["transaction"] === "location" || s["transaction"] === "vente") out.transaction = s["transaction"];
  if (typeof s["type"] === "string" && PROPERTY_TYPES.includes(s["type"] as PropertyType)) out.type = s["type"] as PropertyType;
  if (typeof s["city"] === "string" && (CITIES as readonly string[]).includes(s["city"])) out.city = s["city"] as City;
  const max = Number(s["maxPrice"]);
  if (s["maxPrice"] !== undefined && Number.isFinite(max) && max > 0) out.maxPrice = max;
  const beds = Number(s["minBedrooms"]);
  if (s["minBedrooms"] !== undefined && Number.isFinite(beds) && beds > 0) out.minBedrooms = beds;
  return out;
}
