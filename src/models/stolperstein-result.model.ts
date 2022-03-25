export interface StolpersteinResult {
  features: Array<Feature>;
}

export interface Feature {
  properties: Property;
  geometry: Geometry;
}

export interface Geometry {
  type: string;
  coordinates: [number, number];
}

interface Property {
  id: number;
  einrichtung: string;
  strasse: string;
  hnr: string;
  hnrz: string;
  plz: string;
  url: string;
}
