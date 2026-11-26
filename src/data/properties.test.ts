import { describe, expect, it } from "vitest";
import { PROPERTIES, filterProperties, formatPrice } from "./properties";

describe("filterProperties", () => {
  it("garde uniquement les biens à louer quand on choisit Louer", () => {
    const r = filterProperties(PROPERTIES, { transaction: "location" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.transaction === "location")).toBe(true);
  });

  it("exclut les biens au-dessus du budget max", () => {
    const r = filterProperties(PROPERTIES, { transaction: "location", maxPrice: 150_000 });
    expect(r.map((p) => p.id).sort()).toEqual(["studio-cadjehoun", "studio-calavi"]);
  });
});

describe("formatPrice", () => {
  it("affiche les loyers en FCFA par mois", () => {
    expect(formatPrice({ price: 350_000, transaction: "location" })).toBe("350 000 FCFA / mois");
  });
});
