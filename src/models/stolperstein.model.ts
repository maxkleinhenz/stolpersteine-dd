export interface StolpersteinFeature {
  stolperstein: Stolperstein;
  geometry: Geometry;
}

interface Geometry {
  type: string;
  coordinates: [number, number];
}

export default interface Stolperstein {
  id: number;
  name: string;
  strasse: string;
  hausnummer: string;
  hausnummerZusatz: string;
  plz: string;
  ort: string;
  url: string;
  sortValue: string;
}
