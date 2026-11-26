import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/site/property-card";
import { getProperty } from "@/data/properties";
import { recommendProperties, type Recommendation } from "@/lib/recommend.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Assistant IA logement — TransMedia" },
      { name: "description", content: "Décrivez le logement idéal avec vos mots et recevez des annonces recommandées au Bénin." },
      { property: "og:title", content: "Assistant IA logement — TransMedia" },
      { property: "og:description", content: "Recherche immobilière en texte libre avec recommandations personnalisées." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AssistantPage,
});

const EXAMPLES = [
  "Studio meublé pas cher près de l'université à Abomey-Calavi, moins de 80 000 FCFA par mois",
  "Villa avec piscine et gardien à Cotonou pour une famille de 4",
  "Je veux acheter un terrain pour construire, budget autour de 15 millions",
];

function AssistantPage() {
  const recommend = useServerFn(recommendProperties);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<(Recommendation & { error?: string }) | null>(null);

  async function submit() {
    if (query.trim().length < 5 || loading) return;
    setLoading(true);
    setRes(null);
    try {
      setRes(await recommend({ data: { query } }));
    } catch {
      setRes({ summary: "", matches: [], error: "L'assistant n'a pas pu répondre. Réessayez." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="eyebrow flex items-center gap-2"><Sparkles className="size-4" /> Assistant IA</p>
      <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Décrivez votre logement idéal</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Écrivez comme vous parleriez à un agent : ville, quartier, budget, nombre de chambres, équipements… L'assistant vous propose les annonces qui correspondent.
      </p>
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="Ex. : Appartement 2 chambres à Cotonou, calme, avec parking, max 250 000 FCFA/mois"
          className="field w-full resize-none"
          aria-label="Vos critères"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" onClick={() => setQuery(ex)} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted">
              {ex}
            </button>
          ))}
        </div>
        <Button className="mt-4" onClick={submit} disabled={loading || query.trim().length < 5}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {loading ? "Recherche en cours…" : "Trouver mes annonces"}
        </Button>
      </div>

      {res?.error && <p className="mt-6 text-destructive">{res.error}</p>}
      {res && !res.error && (
        <div className="mt-8">
          <p className="text-muted-foreground">{res.summary}</p>
          {res.matches.length === 0 ? (
            <p className="mt-4">Aucune annonce ne correspond pour l'instant. Essayez d'élargir vos critères.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {res.matches.map((m) => {
                const p = getProperty(m.id);
                if (!p) return null;
                return (
                  <div key={m.id} className="space-y-3">
                    <PropertyCard property={p} />
                    <div className="rounded-xl bg-muted p-3 text-sm">
                      <span className="font-bold text-primary">{Math.round(m.score)}% · </span>{m.reason}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
