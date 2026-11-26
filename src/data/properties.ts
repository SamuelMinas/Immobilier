import heroVilla from "@/assets/hero-villa.jpg";
import apartment from "@/assets/prop-apartment.jpg";
import house from "@/assets/prop-house.jpg";
import land from "@/assets/prop-land.jpg";
import studio from "@/assets/prop-studio.jpg";
import office from "@/assets/prop-office.jpg";

export type Transaction = "location" | "vente";
export type PropertyType = "Appartement" | "Maison" | "Villa" | "Studio" | "Terrain" | "Bureau";

export const CITIES = [
  "Cotonou",
  "Abomey-Calavi",
  "Porto-Novo",
  "Ouidah",
  "Parakou",
  "Bohicon",
] as const;
export type City = (typeof CITIES)[number];

export const PROPERTY_TYPES: PropertyType[] = [
  "Appartement",
  "Maison",
  "Villa",
  "Studio",
  "Terrain",
  "Bureau",
];

export type Publisher = {
  kind: "proprietaire" | "agence";
  name: string;
  phone: string;
  verified: boolean;
  agencyId?: string;
};

export type Property = {
  id: string;
  title: string;
  type: PropertyType;
  transaction: Transaction;
  price: number;
  city: City;
  district: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  description: string;
  features: string[];
  publisher: Publisher;
  publishedAt: string;
  featured: boolean;
};

export type Agency = {
  id: string;
  name: string;
  city: City;
  address: string;
  phone: string;
  since: number;
  rating: number;
  specialties: string[];
  description: string;
};

export const AGENCIES: Agency[] = [
  {
    id: "atlantique-immo",
    name: "Atlantique Immo",
    city: "Cotonou",
    address: "Boulevard de la Marina, Haie Vive",
    phone: "+229 01 97 12 34 56",
    since: 2011,
    rating: 4.8,
    specialties: ["Villas", "Location meublée", "Expatriés"],
    description: "Spécialiste des biens haut de gamme à Cotonou, de Haie Vive à Fidjrossè.",
  },
  {
    id: "oueme-habitat",
    name: "Ouémé Habitat",
    city: "Porto-Novo",
    address: "Quartier Ouando, face au marché",
    phone: "+229 01 96 45 22 10",
    since: 2015,
    rating: 4.6,
    specialties: ["Maisons familiales", "Vente"],
    description: "Maisons et appartements pour familles dans la capitale et ses environs.",
  },
  {
    id: "calavi-residences",
    name: "Calavi Résidences",
    city: "Abomey-Calavi",
    address: "Carrefour Kpota, route de l'université",
    phone: "+229 01 95 88 77 03",
    since: 2018,
    rating: 4.5,
    specialties: ["Terrains", "Studios étudiants"],
    description: "Terrains titrés et logements étudiants près de l'Université d'Abomey-Calavi.",
  },
  {
    id: "borgou-immobilier",
    name: "Borgou Immobilier",
    city: "Parakou",
    address: "Avenue de l'Indépendance, Zongo",
    phone: "+229 01 94 30 61 18",
    since: 2013,
    rating: 4.7,
    specialties: ["Locaux commerciaux", "Maisons"],
    description: "La référence immobilière du nord Bénin, de Parakou à Djougou.",
  },
];

export const PROPERTIES: Property[] = [
  {
    id: "villa-haie-vive",
    title: "Villa contemporaine avec jardin tropical",
    type: "Villa",
    transaction: "vente",
    price: 185_000_000,
    city: "Cotonou",
    district: "Haie Vive",
    bedrooms: 5,
    bathrooms: 4,
    area: 420,
    images: [heroVilla, apartment, studio],
    description:
      "Superbe villa R+1 dans le quartier prisé de Haie Vive. Grand séjour lumineux ouvert sur une terrasse couverte, jardin arboré, cuisine équipée et suite parentale avec dressing. Titre foncier disponible.",
    features: ["Titre foncier", "Jardin", "Groupe électrogène", "Gardiennage", "Parking 3 voitures", "Climatisation"],
    publisher: { kind: "agence", name: "Atlantique Immo", phone: "+229 01 97 12 34 56", verified: true, agencyId: "atlantique-immo" },
    publishedAt: "2026-11-18",
    featured: true,
  },
  {
    id: "appart-fidjrosse",
    title: "Appartement meublé 3 pièces vue sur ville",
    type: "Appartement",
    transaction: "location",
    price: 350_000,
    city: "Cotonou",
    district: "Fidjrossè",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    images: [apartment, studio, heroVilla],
    description:
      "Appartement entièrement meublé au 4e étage avec balcon et vue dégagée, à 5 minutes de la plage de Fidjrossè. Idéal pour un couple ou des professionnels en mission.",
    features: ["Meublé", "Balcon", "Climatisation", "Eau chaude", "Wi‑Fi", "Ascenseur"],
    publisher: { kind: "agence", name: "Atlantique Immo", phone: "+229 01 97 12 34 56", verified: true, agencyId: "atlantique-immo" },
    publishedAt: "2026-11-20",
    featured: true,
  },
  {
    id: "maison-ouando",
    title: "Maison familiale R+1 avec cour fermée",
    type: "Maison",
    transaction: "location",
    price: 250_000,
    city: "Porto-Novo",
    district: "Ouando",
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    images: [house, apartment],
    description:
      "Belle maison à étage dans un quartier calme de Porto-Novo. Cour pavée, portail sécurisé, grand balcon. Proche écoles et marché de Ouando.",
    features: ["Cour fermée", "Balcon", "Forage", "Parking", "Compteur SBEE"],
    publisher: { kind: "proprietaire", name: "M. Codjo Hounkpatin", phone: "+229 01 66 21 40 87", verified: true },
    publishedAt: "2026-11-15",
    featured: true,
  },
  {
    id: "terrain-calavi",
    title: "Terrain titré de 500 m² clôturé",
    type: "Terrain",
    transaction: "vente",
    price: 12_500_000,
    city: "Abomey-Calavi",
    district: "Kpota",
    area: 500,
    images: [land],
    description:
      "Parcelle de 500 m² entièrement clôturée, sol latéritique sec, accès par voie pavée. Titre foncier en règle, idéal pour construction résidentielle.",
    features: ["Titre foncier", "Clôturé", "Voie pavée", "Zone non inondable"],
    publisher: { kind: "agence", name: "Calavi Résidences", phone: "+229 01 95 88 77 03", verified: true, agencyId: "calavi-residences" },
    publishedAt: "2026-11-10",
    featured: true,
  },
  {
    id: "studio-cadjehoun",
    title: "Studio moderne climatisé près de l'aéroport",
    type: "Studio",
    transaction: "location",
    price: 120_000,
    city: "Cotonou",
    district: "Cadjèhoun",
    bedrooms: 1,
    bathrooms: 1,
    area: 32,
    images: [studio, apartment],
    description:
      "Studio rénové avec chambre spacieuse, coin bureau et salle d'eau. Immeuble sécurisé à deux pas de l'aéroport et des commerces de Cadjèhoun.",
    features: ["Climatisation", "Gardien", "Meublé", "Eau courante"],
    publisher: { kind: "proprietaire", name: "Mme Afiavi Dossou", phone: "+229 01 61 09 55 32", verified: false },
    publishedAt: "2026-11-21",
    featured: true,
  },
  {
    id: "bureau-ganhi",
    title: "Plateau de bureaux 180 m² en centre-ville",
    type: "Bureau",
    transaction: "location",
    price: 900_000,
    city: "Cotonou",
    district: "Ganhi",
    bathrooms: 2,
    area: 180,
    images: [office],
    description:
      "Plateau de bureaux en open space dans un immeuble vitré du quartier d'affaires de Ganhi. Salle de réunion, fibre optique et parking visiteurs.",
    features: ["Fibre optique", "Groupe électrogène", "Parking", "Ascenseur", "Sécurité 24h/24"],
    publisher: { kind: "agence", name: "Atlantique Immo", phone: "+229 01 97 12 34 56", verified: true, agencyId: "atlantique-immo" },
    publishedAt: "2026-11-12",
    featured: true,
  },
  {
    id: "maison-parakou",
    title: "Maison 3 chambres quartier Zongo",
    type: "Maison",
    transaction: "vente",
    price: 38_000_000,
    city: "Parakou",
    district: "Zongo",
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    images: [house, land],
    description:
      "Maison plain-pied avec grande cour, dépendance et puits. Quartier vivant, proche de la grande mosquée et des axes principaux.",
    features: ["Cour", "Dépendance", "Puits", "Convention de vente"],
    publisher: { kind: "agence", name: "Borgou Immobilier", phone: "+229 01 94 30 61 18", verified: true, agencyId: "borgou-immobilier" },
    publishedAt: "2026-11-08",
    featured: false,
  },
  {
    id: "studio-calavi",
    title: "Chambre-salon étudiante près de l'UAC",
    type: "Studio",
    transaction: "location",
    price: 45_000,
    city: "Abomey-Calavi",
    district: "Zogbadjè",
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
    images: [studio],
    description:
      "Chambre-salon avec douche interne, dans une cour calme à 7 minutes à pied de l'Université d'Abomey-Calavi. Caution : 3 mois.",
    features: ["Douche interne", "Compteur individuel", "Cour calme"],
    publisher: { kind: "agence", name: "Calavi Résidences", phone: "+229 01 95 88 77 03", verified: true, agencyId: "calavi-residences" },
    publishedAt: "2026-11-19",
    featured: false,
  },
  {
    id: "villa-ouidah",
    title: "Villa de plage avec piscine à Ouidah",
    type: "Villa",
    transaction: "location",
    price: 1_200_000,
    city: "Ouidah",
    district: "Route des Pêches",
    bedrooms: 4,
    bathrooms: 4,
    area: 300,
    images: [heroVilla, apartment],
    description:
      "Villa les pieds dans le sable sur la Route des Pêches. Piscine, paillote, grand jardin de cocotiers. Location longue durée.",
    features: ["Piscine", "Accès plage", "Jardin", "Gardiennage", "Climatisation"],
    publisher: { kind: "proprietaire", name: "M. Sèna Agbo", phone: "+229 01 67 70 14 29", verified: true },
    publishedAt: "2026-11-05",
    featured: false,
  },
  {
    id: "terrain-bohicon",
    title: "Lot de 2 parcelles de 400 m² à Bohicon",
    type: "Terrain",
    transaction: "vente",
    price: 7_000_000,
    city: "Bohicon",
    district: "Sodohomè",
    area: 800,
    images: [land],
    description:
      "Deux parcelles contiguës de 400 m² chacune, vendues ensemble ou séparément. Zone en plein développement, à 2 km de la RNIE 2.",
    features: ["Convention de vente", "Plat", "Proche route nationale"],
    publisher: { kind: "proprietaire", name: "M. Rodrigue Gbaguidi", phone: "+229 01 69 32 18 74", verified: false },
    publishedAt: "2026-11-02",
    featured: false,
  },
  {
    id: "appart-porto-novo",
    title: "Appartement 4 pièces à vendre près de Ouando",
    type: "Appartement",
    transaction: "vente",
    price: 32_000_000,
    city: "Porto-Novo",
    district: "Ouando",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: [apartment, house],
    description:
      "Appartement au 1er étage d'une petite résidence sécurisée, séjour spacieux avec balcon, cuisine équipée et trois chambres. Idéal pour une famille.",
    features: ["Balcon", "Résidence sécurisée", "Parking", "Forage", "Titre foncier"],
    publisher: { kind: "agence", name: "Ouémé Habitat", phone: "+229 01 96 45 22 10", verified: true, agencyId: "oueme-habitat" },
    publishedAt: "2026-11-17",
    featured: false,
  },
];

export type PropertyFilters = {
  q?: string;
  transaction?: Transaction;
  type?: PropertyType;
  city?: City;
  maxPrice?: number;
  minBedrooms?: number;
};

export function filterProperties(list: Property[], f: PropertyFilters): Property[] {
  const q = f.q?.trim().toLowerCase();
  return list.filter((p) => {
    if (f.transaction && p.transaction !== f.transaction) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.city && p.city !== f.city) return false;
    if (f.maxPrice !== undefined && p.price > f.maxPrice) return false;
    if (f.minBedrooms !== undefined && (p.bedrooms ?? 0) < f.minBedrooms) return false;
    if (q) {
      const hay = `${p.title} ${p.city} ${p.district} ${p.type}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function formatPrice(p: Pick<Property, "price" | "transaction">): string {
  const amount = new Intl.NumberFormat("fr-FR").format(p.price).replace(/\s/g, " ");
  return p.transaction === "location" ? `${amount} FCFA / mois` : `${amount} FCFA`;
}

export function getProperty(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id);
}

export function getAgency(id: string): Agency | undefined {
  return AGENCIES.find((a) => a.id === id);
}

export function countByAgency(id: string): number {
  return PROPERTIES.filter((p) => p.publisher.agencyId === id).length;
}
