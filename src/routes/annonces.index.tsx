import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/site/property-card";
import { CITIES, PROPERTIES, PROPERTY_TYPES, filterProperties, type City, type PropertyType } from "@/data/properties";
import { validateAnnoncesSearch, type AnnoncesSearch } from "@/data/search";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/annonces/")({
  validateSearch: validateAnnoncesSearch,
  head: () => ({
    meta: [
      { title: "Annonces immobilières au Bénin — TransMedia" },
      { name: "description", content: "Parcourez les maisons, appartements, studios, terrains et bureaux à louer ou à vendre au Bénin." },
      { property: "og:title", content: "Annonces immobilières au Bénin — TransMedia" },
      { property: "og:description", content: "Filtrez par ville, budget et type de bien et contactez directement propriétaires et agences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnnoncesPage,
});

const BUDGETS_LOCATION = [50_000, 150_000, 300_000, 600_000, 1_000_000];
const BUDGETS_VENTE = [10_000_000, 25_000_000, 50_000_000, 100_000_000, 200_000_000];

function fmt(n: number) {
  return n >= 1_000_000 ? `${n / 1_000_000} M` : `${n / 1000} k`;
}

function AnnoncesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/annonces/" });
  const results = filterProperties(PROPERTIES, search);

  const update = (patch: Partial<Record<keyof AnnoncesSearch, AnnoncesSearch[keyof AnnoncesSearch] | undefined>>) => {
    navigate({
      search: (prev) => {
        const next: Record<string, unknown> = { ...prev, ...patch };
        for (const k of Object.keys(next)) if (next[k] === undefined || next[k] === "") delete next[k];
        return validateAnnoncesSearch(next);
      },
      replace: true,
    });
  };

  const budgets = search.transaction === "vente" ? BUDGETS_VENTE : BUDGETS_LOCATION;
  const activeCount = Object.keys(search).length;
  const heading =
    search.transaction === "location" ? "Biens à louer" : search.transaction === "vente" ? "Biens à vendre" : "Toutes les annonces";

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{search.city ?? "Tout le Bénin"}</p>
          <h1 className="mt-2 text-4xl font-semibold md:text-5xl">{heading}</h1>
          <p className="mt-2 text-muted-foreground">
            {results.length} bien{results.length > 1 ? "s" : ""} correspond{results.length > 1 ? "ent" : ""} à votre recherche
          </p>
        </div>
        <input
          type="search"
          defaultValue={search.q ?? ""}
          placeholder="Quartier, ville, mot-clé…"
          onKeyDown={(e) => {
            if (e.key === "Enter") update({ q: (e.target as HTMLInputElement).value });
          }}
          className="field max-w-xs"
          aria-label="Rechercher par mot-clé"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-wider">
              <SlidersHorizontal className="size-4" /> Filtres
            </h2>
            {activeCount > 0 && (
              <Link to="/annonces" className="flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                <X className="size-3" /> Effacer
              </Link>
            )}
          </div>

          <FilterGroup label="Transaction">
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
              {[
                { v: undefined, l: "Tout" },
                { v: "location" as const, l: "Louer" },
                { v: "vente" as const, l: "Acheter" },
              ].map((o) => (
                <button
                  key={o.l}
                  type="button"
                  onClick={() => update({ transaction: o.v, maxPrice: undefined })}
                  className={cn(
                    "rounded-lg py-1.5 text-sm font-semibold transition",
                    search.transaction === o.v ? "bg-card text-foreground shadow-card" : "text-muted-foreground",
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Ville">
            <select className="field" value={search.city ?? ""} onChange={(e) => update({ city: (e.target.value || undefined) as City | undefined })}>
              <option value="">Tout le Bénin</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FilterGroup>

          <FilterGroup label="Type de bien">
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((t) => (
                <Chip key={t} active={search.type === t} onClick={() => update({ type: search.type === t ? undefined : (t as PropertyType) })}>
                  {t}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label={`Budget max ${search.transaction === "vente" ? "" : "/ mois"}`}>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <Chip key={b} active={search.maxPrice === b} onClick={() => update({ maxPrice: search.maxPrice === b ? undefined : b })}>
                  {fmt(b)} FCFA
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Chambres minimum">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <Chip key={n} active={search.minBedrooms === n} onClick={() => update({ minBedrooms: search.minBedrooms === n ? undefined : n })}>
                  {n}+
                </Chip>
              ))}
            </div>
          </FilterGroup>
        </aside>

        <section>
          {results.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <SearchX className="size-10 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">Aucun bien ne correspond</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">Élargissez votre budget ou retirez un filtre pour voir plus d'annonces.</p>
              <Button variant="soft" className="mt-6" asChild>
                <Link to="/annonces">Réinitialiser les filtres</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary",
      )}
    >
      {children}
    </button>
  );
}
