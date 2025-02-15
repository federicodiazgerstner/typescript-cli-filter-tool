export type Property = {
  squareFootage: number;
  lighting: "low" | "medium" | "high";
  price: number;
  rooms: number;
  bathrooms: number;
  location: [number, number];
  description: string;
  amenities: Record<string, boolean>;
};

export type FilterCriteria = {
  squareFootage?: { min?: number; max?: number };
  lighting?: "low" | "medium" | "high";
  price?: { min?: number; max?: number };
  rooms?: number;
  bathrooms?: number;
  includes?: string[]; // Must include words in description
  amenities?: string[]; // Must have these amenities
  location?: { lat: number; lon: number; maxDistance: number };
};
