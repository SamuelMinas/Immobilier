import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, Camera, CheckCircle2, Home, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CITIES, PROPERTY_TYPES, type Transaction } from "@/data/properties";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/publier")({
  head: () => ({
    meta: [
      { title: "Publier une annonce immobilière — TransMedia" },
      { name: "description", content: "Propriétaires et agences : publiez gratuitement votre bien à louer ou à vendre au Bénin." },
      { property: "og:title", content: "Publier une annonce immobilière — TransMedia" },
      { property: "og:description", content: "Publiez votre bien en 5 minutes et recevez des contacts qualifiés." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublierPage,
});

const FEATURES = ["Climatisation", "Meublé", "Parking", "Gardiennage", "Groupe électrogène", "Forage", "Titre foncier", "Jardin", "Piscine", "Wi‑Fi"];

function PublierPage() {
  const [role, setRole] = useState<"proprietaire" | "agence">("proprietaire");
  const [transaction, setTransaction] = useState<Transaction>("location");
  const [features, setFeatures] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mx-auto grid max-w-xl place-items-center px-4 py-24 text-center">
        <CheckCircle2 className="size-14 text-primary" />
        <h1 className="mt-6 text-4xl font-semibold">Annonce envoyée !</h1>
        <p className="mt-3 text-muted-foreground">
          Notre équipe vérifie votre annonce sous 48 h. Vous recevrez un SMS dès sa mise en ligne.
        </p>
        <Button variant="soft" className="mt-8" onClick={() => setSent(false)}>Publier un autre bien</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6">
      <p className="eyebrow">Propriétaires & agences</p>
      <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Publier une annonce</h1>
      <p className="mt-3 text-muted-foreground">Gratuit pour les particuliers. Vérification sous 48 h.</p>

      <form
        className="mt-10 space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Annonce envoyée pour vérification");
          setSent(true);
          window.scrollTo({ top: 0 });
        }}
      >
        <Section n={1} title="Vous êtes">
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              { v: "proprietaire", l: "Propriétaire particulier", d: "Je loue ou vends mon propre bien", icon: UserRound },
              { v: "agence", l: "Agence immobilière", d: "Je gère des biens pour des clients", icon: Building2 },
            ] as const).map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setRole(o.v)}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition",
                  role === o.v ? "border-primary bg-secondary" : "border-border bg-card hover:border-primary/50",
                )}
              >
                <o.icon className="mt-0.5 size-5 text-primary" />
                <span>
                  <span className="block font-bold">{o.l}</span>
                  <span className="text-sm text-muted-foreground">{o.d}</span>
                </span>
              </button>
            ))}
          </div>
        </Section>

        <Section n={2} title="Le bien">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Type d'annonce</Label>
              <div className="mt-2 flex w-fit rounded-xl bg-muted p-1">
                {(["location", "vente"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setTransaction(t)} className={cn("rounded-lg px-5 py-2 text-sm font-semibold", transaction === t ? "bg-card shadow-card" : "text-muted-foreground")}>
                    {t === "location" ? "À louer" : "À vendre"}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Titre de l'annonce" className="sm:col-span-2">
              <Input required placeholder="ex. Appartement 3 pièces meublé à Fidjrossè" className="h-11 bg-card" />
            </Field>
            <Field label="Type de bien">
              <select required className="field">{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            </Field>
            <Field label={transaction === "location" ? "Loyer mensuel (FCFA)" : "Prix de vente (FCFA)"}>
              <Input required inputMode="numeric" placeholder={transaction === "location" ? "150 000" : "25 000 000"} className="h-11 bg-card" />
            </Field>
            <Field label="Ville">
              <select required className="field">{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Quartier">
              <Input required placeholder="ex. Cadjèhoun" className="h-11 bg-card" />
            </Field>
            <Field label="Surface (m²)"><Input inputMode="numeric" placeholder="90" className="h-11 bg-card" /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Chambres"><Input type="number" min={0} placeholder="2" className="h-11 bg-card" /></Field>
              <Field label="Salles d'eau"><Input type="number" min={0} placeholder="1" className="h-11 bg-card" /></Field>
            </div>
            <Field label="Description" className="sm:col-span-2">
              <Textarea rows={4} placeholder="Décrivez le bien, l'environnement, les conditions (caution, avance…)" className="bg-card" />
            </Field>
          </div>
        </Section>

        <Section n={3} title="Équipements">
          <div className="flex flex-wrap gap-2">
            {FEATURES.map((f) => {
              const on = features.includes(f);
              return (
                <button key={f} type="button" aria-pressed={on} onClick={() => setFeatures((l) => (on ? l.filter((x) => x !== f) : [...l, f]))}
                  className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition", on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary")}>
                  {f}
                </button>
              );
            })}
          </div>
        </Section>

        <Section n={4} title="Photos">
          <label className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-border bg-card px-6 py-12 text-center transition hover:border-primary">
            <Camera className="size-8 text-accent" />
            <span className="mt-3 font-bold">Ajoutez jusqu'à 10 photos</span>
            <span className="text-sm text-muted-foreground">Les annonces avec photos reçoivent 5× plus de contacts</span>
            <input type="file" accept="image/*" multiple className="sr-only" />
          </label>
        </Section>

        <Section n={5} title="Vos coordonnées">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={role === "agence" ? "Nom de l'agence" : "Nom complet"}><Input required className="h-11 bg-card" /></Field>
            <Field label="Téléphone / WhatsApp"><Input required type="tel" placeholder="+229 01 …" className="h-11 bg-card" /></Field>
            {role === "agence" && (
              <Field label="Numéro IFU / RCCM" className="sm:col-span-2"><Input placeholder="Pour obtenir le badge Vérifié" className="h-11 bg-card" /></Field>
            )}
          </div>
        </Section>

        <div className="flex flex-col items-start gap-3 rounded-2xl bg-secondary p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-secondary-foreground"><Home className="size-4" /> En publiant, vous certifiez être habilité à proposer ce bien.</p>
          <Button type="submit" variant="accent" size="xl">Publier l'annonce</Button>
        </div>
      </form>
    </div>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-background p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <span className="grid size-8 place-items-center rounded-full bg-primary font-sans text-sm font-bold text-primary-foreground">{n}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
