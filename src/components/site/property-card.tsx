import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bath, BadgeCheck, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export function TransactionBadge({ transaction }: { transaction: Property["transaction"] }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
        transaction === "location" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
      )}
    >
      {transaction === "location" ? "À louer" : "À vendre"}
    </span>
  );
}

export function PropertyCard({ property }: { property: Property }) {
  const [fav, setFav] = useState(false);
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to="/annonces/$id" params={{ id: property.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <TransactionBadge transaction={property.transaction} />
            <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
              {property.type}
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="font-display text-xl font-semibold text-primary">{formatPrice(property)}</p>
          <h3 className="mt-1 line-clamp-1 font-sans text-base font-semibold text-foreground">{property.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" /> {property.district}, {property.city}
          </p>
          <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
            {property.bedrooms !== undefined && (
              <span className="flex items-center gap-1.5 whitespace-nowrap"><BedDouble className="size-4" /> {property.bedrooms} ch.</span>
            )}
            {property.bathrooms !== undefined && (
              <span className="flex items-center gap-1.5 whitespace-nowrap"><Bath className="size-4" /> {property.bathrooms}</span>
            )}
            <span className="flex items-center gap-1.5 whitespace-nowrap"><Ruler className="size-4" /> {property.area} m²</span>
            {property.publisher.verified && (
              <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary">
                <BadgeCheck className="size-4" /> Vérifié
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => setFav((v) => !v)}
        aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
        aria-pressed={fav}
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card backdrop-blur transition hover:scale-110"
      >
        <Heart className={cn("size-4", fav && "fill-accent text-accent")} />
      </button>
    </article>
  );
}
