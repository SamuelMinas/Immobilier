import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Building2, Handshake, KeyRound, MessageCircle, Search, ShieldCheck } from "lucide-react";
import heroVilla from "@/assets/hero-villa.jpg";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/site/property-card";
import { AGENCIES, CITIES, PROPERTIES, PROPERTY_TYPES, countByAgency, type City, type PropertyType, type Transaction } from "@/data/properties";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TransMedia — Louer ou acheter un logement au Bénin" },
      { name: "description", content: "Trouvez maisons, appartements, studios et terrains à louer ou à vendre à Cotonou, Calavi, Porto-Novo et partout au Bénin." },
      { property: "og:title", content: "TransMedia — Louer ou acheter un logement au Bénin" },
      { property: "og:description", content: "Propriétaires et agences vérifiés, annonces à jour, contact direct." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function HeroSearch() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction>("location");
  const [city, setCity] = useState<City | "">("");
  const [type, setType] = useState<PropertyType | "">("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({
          to: "/annonces",
          search: {
            transaction,
            ...(city ? { city } : {}),
            ...(type ? { type } : {}),
            ...(maxPrice ? { maxPrice: Number(maxPrice) } : {}),
          },
        });
      }}
      className="w-full max-w-4xl rounded-3xl bg-card p-3 shadow-float"
    >
      <div className="flex gap-1 p-1">
        {(["location", "vente"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTransaction(t)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition",
              transaction === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary",
            )}
          >
            {t === "location" ? "Louer" : "Acheter"}
          </button>
        ))}
      </div>
      <div className="grid gap-2 p-1 md:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="rounded-2xl bg-muted px-4 py-2.5">
          <span className="block text-xs font-semibold text-muted-foreground">Ville</span>
          <select value={city} onChange={(e) => setCity(e.target.value as City | "")} className="w-full bg-transparent text-sm font-semibold text-foreground outline-none">
            <option value="">Tout le Bénin</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="rounded-2xl bg-muted px-4 py-2.5">
          <span className="block text-xs font-semibold text-muted-foreground">Type de bien</span>
          <select value={type} onChange={(e) => setType(e.target.value as PropertyType | "")} className="w-full bg-transparent text-sm font-semibold text-foreground outline-none">
            <option value="">Tous les types</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="rounded-2xl bg-muted px-4 py-2.5">
          <span className="block text-xs font-semibold text-muted-foreground">Budget max (FCFA)</span>
          <input
            inputMode="numeric"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
            placeholder={transaction === "location" ? "ex. 200000" : "ex. 25000000"}
            className="w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground"
          />
        </label>
        <Button type="submit" variant="accent" size="xl" className="h-auto min-h-12 rounded-2xl">
          <Search /> Rechercher
        </Button>
      </div>
    </form>
  );
}

function Index() {
  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={heroVilla} alt="Villa moderne à Cotonou au coucher du soleil" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto flex min-h-[640px] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">
            <BadgeCheck className="size-3.5" /> Annonces vérifiées partout au Bénin
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] text-ink-foreground md:text-7xl">
            Votre prochain chez-vous, <em className="font-medium text-gold">au Bénin</em>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-foreground/85">
            Maisons, appartements, terrains et bureaux — en contact direct avec les propriétaires et les agences.
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {[
            ["2 400+", "annonces actives"],
            ["12", "départements couverts"],
            ["180", "agences partenaires"],
            ["48 h", "pour vérifier une annonce"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-3xl font-semibold text-primary">{n}</p>
              <p className="text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Sélection de la semaine</p>
            <h2 className="mt-2 text-4xl font-semibold">Biens à la une</h2>
          </div>
          <Button variant="soft" asChild>
            <Link to="/annonces">Voir toutes les annonces <ArrowRight /></Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* Cities */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <p className="eyebrow">Explorer par ville</p>
        <h2 className="mt-2 text-4xl font-semibold">Où voulez-vous vivre ?</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {CITIES.map((c) => (
            <Link
              key={c}
              to="/annonces"
              search={{ city: c }}
              className="group flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <span className="font-semibold">{c}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">
                {PROPERTIES.filter((p) => p.city === c).length}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Comment ça marche</p>
            <h2 className="mt-2 text-4xl font-semibold">Simple, sûr et direct.</h2>
            <p className="mt-4 text-muted-foreground">
              Fini les démarcheurs et les visites inutiles : chaque annonce est contrôlée et vous parlez directement au bon interlocuteur.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Search, title: "Cherchez", text: "Filtrez par ville, quartier, budget et type de bien." },
              { icon: MessageCircle, title: "Contactez", text: "Écrivez ou appelez le propriétaire ou l'agence en un clic." },
              { icon: KeyRound, title: "Emménagez", text: "Planifiez la visite, signez et récupérez vos clés." },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></span>
                  <span className="font-display text-4xl font-semibold text-border">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owners band */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-band p-8 text-primary-foreground md:p-14">
          <div className="pattern-dots absolute inset-y-0 right-0 hidden w-1/2 opacity-60 md:block" />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Propriétaires & agences</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Vous avez un bien à louer ou à vendre ?</h2>
              <p className="mt-4 max-w-md text-primary-foreground/80">
                Publiez votre annonce en 5 minutes et recevez des demandes de personnes réellement intéressées.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="gold" size="xl" asChild>
                  <Link to="/publier">Publier une annonce <ArrowRight /></Link>
                </Button>
                <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                  <Link to="/connexion">Créer un compte agence</Link>
                </Button>
              </div>
            </div>
            <ul className="grid content-center gap-4">
              {[
                { icon: ShieldCheck, t: "Badge « Vérifié » après contrôle des documents" },
                { icon: Handshake, t: "Contacts qualifiés, sans intermédiaire caché" },
                { icon: Building2, t: "Espace agence pour gérer tout votre portefeuille" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-center gap-4 rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur">
                  <Icon className="size-6 shrink-0 text-gold" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Agencies teaser */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Ils nous font confiance</p>
            <h2 className="mt-2 text-4xl font-semibold">Agences partenaires</h2>
          </div>
          <Button variant="soft" asChild>
            <Link to="/agences">Toutes les agences <ArrowRight /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENCIES.map((a) => (
            <div key={a.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="grid size-12 place-items-center rounded-xl bg-secondary font-display text-lg font-semibold text-primary">
                {a.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <h3 className="mt-4 font-sans text-base font-bold">{a.name}</h3>
              <p className="text-sm text-muted-foreground">{a.city} · {countByAgency(a.id)} annonces</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
