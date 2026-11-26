import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Bath, BedDouble, CalendarDays, Check, MapPin, MessageCircle, Phone, Ruler, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PropertyCard, TransactionBadge } from "@/components/site/property-card";
import { PROPERTIES, formatPrice, getProperty } from "@/data/properties";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/annonces/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    const title = p ? `${p.title} — ${p.district}, ${p.city} | TransMedia` : "Annonce introuvable | TransMedia";
    const description = p ? `${formatPrice(p)} · ${p.type} de ${p.area} m² à ${p.district}, ${p.city}.` : "Cette annonce n'est plus disponible.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold">Annonce introuvable</h1>
      <p className="mt-3 text-muted-foreground">Ce bien a peut-être déjà été loué ou vendu.</p>
      <Button className="mt-6" asChild><Link to="/annonces">Voir les annonces</Link></Button>
    </div>
  ),
  component: PropertyPage,
});

function PropertyPage() {
  const { property: p } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const similar = PROPERTIES.filter((x) => x.id !== p.id && (x.city === p.city || x.type === p.type)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link to="/annonces" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Retour aux annonces
      </Link>

      {/* Gallery */}
      <div className="mt-5 grid gap-3 md:grid-cols-[3fr_1fr]">
        <div className="h-72 overflow-hidden rounded-3xl sm:h-96 md:h-[520px]">
          <img src={p.images[active]} alt={p.title} className="h-full w-full object-cover" />
        </div>
        <div className="grid auto-rows-[96px] grid-cols-3 gap-3 sm:auto-rows-[140px] md:auto-rows-[164px] md:grid-cols-1">
          {p.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn("overflow-hidden rounded-2xl ring-offset-2 ring-offset-background transition", active === i ? "ring-2 ring-accent" : "opacity-75 hover:opacity-100")}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <TransactionBadge transaction={p.transaction} />
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{p.type}</span>
            <span className="text-xs text-muted-foreground">Publiée le {new Date(p.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{p.title}</h1>
          <p className="mt-3 flex items-center gap-1.5 text-muted-foreground"><MapPin className="size-4" /> {p.district}, {p.city}</p>
          <p className="mt-5 font-display text-3xl font-semibold text-primary">{formatPrice(p)}</p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              p.bedrooms !== undefined && { icon: BedDouble, v: `${p.bedrooms}`, l: "chambres" },
              p.bathrooms !== undefined && { icon: Bath, v: `${p.bathrooms}`, l: "salles d'eau" },
              { icon: Ruler, v: `${p.area} m²`, l: "surface" },
            ]
              .filter((x): x is { icon: typeof Ruler; v: string; l: string } => Boolean(x))
              .map(({ icon: Icon, v, l }) => (
                <div key={l} className="rounded-2xl border border-border bg-card p-4">
                  <Icon className="size-5 text-accent" />
                  <p className="mt-3 font-display text-2xl font-semibold">{v}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
          </div>

          <h2 className="mt-12 text-2xl font-semibold">Description</h2>
          <p className="mt-3 leading-relaxed text-foreground/85">{p.description}</p>

          <h2 className="mt-10 text-2xl font-semibold">Équipements & atouts</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-sm font-medium">
                <span className="grid size-6 place-items-center rounded-full bg-secondary text-primary"><Check className="size-3.5" /></span>
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">Localisation</h2>
          <div className="pattern-dots mt-4 grid h-56 place-items-center rounded-2xl border border-border bg-secondary">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-card">
              <MapPin className="size-4 text-accent" /> {p.district}, {p.city}
            </div>
          </div>
        </div>

        {/* Contact */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-card p-6 shadow-lift">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground">
                {p.publisher.name.replace(/^(M\.|Mme)\s/, "").split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-bold">{p.publisher.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  {p.publisher.kind === "agence" ? "Agence immobilière" : "Propriétaire particulier"}
                  {p.publisher.verified && <><span>·</span><BadgeCheck className="size-3.5 text-primary" /> <span className="font-semibold text-primary">Vérifié</span></>}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="default" size="lg" onClick={() => setShowPhone(true)}>
                <Phone /> {showPhone ? "Appeler" : "Voir le n°"}
              </Button>
              <Button variant="soft" size="lg" onClick={() => toast.success("Ouverture de WhatsApp (maquette)")}>
                <MessageCircle /> WhatsApp
              </Button>
            </div>
            {showPhone && <p className="mt-3 text-center font-display text-xl font-semibold text-primary">{p.publisher.phone}</p>}

            <form
              className="mt-6 space-y-3 border-t border-border pt-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message envoyé !", { description: `${p.publisher.name} vous répondra très vite.` });
                (e.target as HTMLFormElement).reset();
              }}
            >
              <p className="text-sm font-bold">Envoyer un message</p>
              <Input required placeholder="Votre nom" className="h-11 bg-background" />
              <Input required type="tel" placeholder="Téléphone (+229…)" className="h-11 bg-background" />
              <Textarea required rows={3} defaultValue={`Bonjour, ce bien (${p.title}) est-il toujours disponible ?`} className="bg-background" />
              <Button type="submit" variant="accent" size="lg" className="w-full">Contacter</Button>
            </form>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => toast.success("Demande de visite envoyée (maquette)")}>
              <CalendarDays /> Planifier une visite
            </Button>
            <Button variant="outline" size="icon" aria-label="Partager" onClick={() => toast("Lien copié (maquette)")}>
              <Share2 />
            </Button>
          </div>
          <p className="px-2 text-xs text-muted-foreground">
            Conseil TransMedia : ne versez jamais d'avance avant d'avoir visité le bien et vérifié les documents.
          </p>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-semibold">Biens similaires</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => <PropertyCard key={s.id} property={s} />)}
          </div>
        </section>
      )}
    </div>
  );
}
