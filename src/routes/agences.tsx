import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Phone, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AGENCIES, countByAgency } from "@/data/properties";

export const Route = createFileRoute("/agences")({
  head: () => ({
    meta: [
      { title: "Agences immobilières partenaires au Bénin — TransMedia" },
      {
        name: "description",
        content:
          "Trouvez une agence immobilière vérifiée à Cotonou, Porto-Novo, Abomey-Calavi ou Parakou.",
      },
      { property: "og:title", content: "Agences immobilières partenaires — TransMedia" },
      {
        property: "og:description",
        content:
          "Des agences vérifiées dans tout le Bénin pour louer, acheter ou faire gérer votre bien.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencesPage,
});

function AgencesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <p className="eyebrow">Annuaire</p>
      <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Agences partenaires</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Chaque agence est contrôlée (IFU, RCCM, adresse physique) avant d'obtenir le badge Vérifié.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {AGENCIES.map((a) => (
          <article key={a.id} className="flex flex-col rounded-3xl bg-card p-6 shadow-card md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-band font-display text-2xl font-semibold text-primary-foreground">
                {a.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1">
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  {a.name} <BadgeCheck className="size-5 text-primary" aria-label="Vérifiée" />
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {a.address}, {a.city}
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                  <Star className="size-4 fill-gold text-gold" /> {a.rating} · depuis {a.since}
                </p>
              </div>
            </div>
            <p className="mt-5 text-foreground/85">{a.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {a.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <span className="mr-auto text-sm text-muted-foreground">
                <strong className="text-foreground">{countByAgency(a.id)}</strong> annonce
                {countByAgency(a.id) > 1 ? "s" : ""} en ligne
              </span>
              <Button variant="soft" asChild>
                <Link to="/annonces" search={{ city: a.city }}>
                  Biens à {a.city}
                </Link>
              </Button>
              <Button onClick={() => toast.success(`Appel vers ${a.phone} (maquette)`)}>
                <Phone /> Contacter
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-dashed border-border p-8 text-center">
        <h2 className="text-2xl font-semibold">Vous êtes une agence ?</h2>
        <p className="mt-2 text-muted-foreground">
          Rejoignez TransMedia et gérez toutes vos annonces depuis un seul espace.
        </p>
        <Button variant="accent" size="lg" className="mt-5" asChild>
          <Link to="/connexion">Créer un compte agence</Link>
        </Button>
      </div>
    </div>
  );
}
