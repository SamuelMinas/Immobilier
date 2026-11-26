import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm text-ink-foreground/70">
            La plateforme qui met en relation ceux qui cherchent un logement ou un bien avec les
            propriétaires et les agences de tout le Bénin.
          </p>
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-gold">Explorer</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            <li><Link to="/annonces" search={{ transaction: "location" }} className="hover:text-gold">Louer un bien</Link></li>
            <li><Link to="/annonces" search={{ transaction: "vente" }} className="hover:text-gold">Acheter un bien</Link></li>
            <li><Link to="/agences" className="hover:text-gold">Agences partenaires</Link></li>
            <li><Link to="/publier" className="hover:text-gold">Publier une annonce</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-gold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-foreground/80">
            <li className="flex items-center gap-2"><MapPin className="size-4 text-gold" /> Cotonou, Bénin</li>
            <li className="flex items-center gap-2"><Phone className="size-4 text-gold" /> +229 01 00 00 00 00</li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-gold" /> contact@transmedia.bj</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-ink-foreground/60 sm:flex-row sm:justify-between sm:px-6">
          <span>© 2026 TransMedia — Tous droits réservés.</span>
          <span>Maquette — les annonces affichées sont fictives.</span>
        </div>
      </div>
    </footer>
  );
}
