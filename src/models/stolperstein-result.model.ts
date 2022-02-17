export interface StolpersteinResult {
  features: Array<Feature>;
}

interface Feature {
  properties: Property;
  geometry: Geometry;
}

interface Geometry {
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
