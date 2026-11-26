import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, Search, UserRound } from "lucide-react";
import { toast } from "sonner";
import heroVilla from "@/assets/hero-villa.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion et inscription — TransMedia" },
      { name: "description", content: "Connectez-vous ou créez votre compte TransMedia : chercheur, propriétaire ou agence." },
      { property: "og:title", content: "Connexion et inscription — TransMedia" },
      { property: "og:description", content: "Un compte pour sauvegarder vos favoris, publier vos biens ou gérer votre agence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConnexionPage,
});

const ROLES = [
  { v: "chercheur", l: "Je cherche", icon: Search },
  { v: "proprietaire", l: "Propriétaire", icon: UserRound },
  { v: "agence", l: "Agence", icon: Building2 },
] as const;

function ConnexionPage() {
  const [role, setRole] = useState<(typeof ROLES)[number]["v"]>("chercheur");

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-12 sm:px-6 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden rounded-3xl lg:block">
        <img src={heroVilla} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative flex h-full flex-col justify-end p-10">
          <h2 className="text-4xl font-semibold text-ink-foreground">Un compte, toutes vos démarches immobilières.</h2>
          <p className="mt-3 text-ink-foreground/80">Favoris, alertes, messages et gestion de vos annonces au même endroit.</p>
        </div>
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-card md:p-10">
        <h1 className="text-3xl font-semibold">Bienvenue sur TransMedia</h1>
        <p className="mt-2 text-sm text-muted-foreground">Maquette — aucun compte n'est réellement créé.</p>
        <Tabs defaultValue="connexion" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connexion">Connexion</TabsTrigger>
            <TabsTrigger value="inscription">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="connexion">
            <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Connexion réussie (maquette)"); }}>
              <div className="space-y-2"><Label htmlFor="li-phone">Téléphone ou e-mail</Label><Input id="li-phone" required className="h-11" placeholder="+229 01 … ou vous@exemple.bj" /></div>
              <div className="space-y-2"><Label htmlFor="li-pass">Mot de passe</Label><Input id="li-pass" type="password" required className="h-11" /></div>
              <Button type="submit" size="lg" className="w-full">Se connecter</Button>
              <button type="button" className="w-full text-center text-sm font-semibold text-accent hover:underline" onClick={() => toast("Lien de réinitialisation envoyé (maquette)")}>
                Mot de passe oublié ?
              </button>
            </form>
          </TabsContent>

          <TabsContent value="inscription">
            <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Compte créé (maquette)"); }}>
              <div>
                <Label>Je m'inscris en tant que</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {ROLES.map((r) => (
                    <button key={r.v} type="button" onClick={() => setRole(r.v)} aria-pressed={role === r.v}
                      className={cn("flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-sm font-semibold transition", role === r.v ? "border-primary bg-secondary" : "border-border hover:border-primary/50")}>
                      <r.icon className="size-5 text-primary" /> {r.l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2"><Label htmlFor="su-name">{role === "agence" ? "Nom de l'agence" : "Nom complet"}</Label><Input id="su-name" required className="h-11" /></div>
              <div className="space-y-2"><Label htmlFor="su-phone">Téléphone</Label><Input id="su-phone" type="tel" required className="h-11" placeholder="+229 01 …" /></div>
              <div className="space-y-2"><Label htmlFor="su-mail">E-mail</Label><Input id="su-mail" type="email" className="h-11" /></div>
              <div className="space-y-2"><Label htmlFor="su-pass">Mot de passe</Label><Input id="su-pass" type="password" required className="h-11" /></div>
              <Button type="submit" variant="accent" size="lg" className="w-full">Créer mon compte</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
