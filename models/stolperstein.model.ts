export interface StolpersteinFeature {
  stolperstein: Stolperstein;
  geometry: Geometry;
}

export interface Stolperstein {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  strasse: string;
  hausnummer: string;
  hausnummerZusatz: string;
  strasseHausnummer: string;
  plz: string;
  ort: string;
  plzOrt: string;
  url: string;
  stolpersteinImage: string;
  stolpersteinThumbImage: string;
  sortValue: string;
}

interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface StolpersteinResult {
  features: Array<Feature>;
}

export interface Feature {
  properties: Property;
  geometry: Geometry;
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
