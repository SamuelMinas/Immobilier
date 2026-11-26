import { Link } from "@tanstack/react-router";
import { Menu, Plus, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";

const linkCls =
  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";
const activeCls = "text-foreground bg-secondary";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link to="/annonces" search={{ transaction: "location" }} className={linkCls} onClick={onNavigate}>
        Louer
      </Link>
      <Link to="/annonces" search={{ transaction: "vente" }} className={linkCls} onClick={onNavigate}>
        Acheter
      </Link>
      <Link to="/annonces" className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ includeSearch: false }} onClick={onNavigate}>
        Toutes les annonces
      </Link>
      <Link to="/assistant" className={linkCls} activeProps={{ className: activeCls }} onClick={onNavigate}>
        Assistant IA
      </Link>
      <Link to="/agences" className={linkCls} activeProps={{ className: activeCls }} onClick={onNavigate}>
        Agences
      </Link>
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLinks />
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" asChild>
            <Link to="/connexion">
              <UserRound /> Connexion
            </Link>
          </Button>
          <Button variant="accent" asChild>
            <Link to="/publier">
              <Plus /> Publier une annonce
            </Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-80 flex-col gap-2 bg-background pt-12">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-1">
              <NavLinks />
              <Link to="/connexion" className={linkCls}>
                Connexion
              </Link>
            </nav>
            <Button variant="accent" size="lg" className="mt-4" asChild>
              <Link to="/publier">
                <Plus /> Publier une annonce
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
