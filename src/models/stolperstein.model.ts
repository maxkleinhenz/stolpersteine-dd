export interface StolpersteinFeature {
  stolperstein: Stolperstein;
  geometry: Geometry;
}

export interface GroupedStolpersteinFeature {
  properties: Array<StolpersteinFeature>;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface Stolperstein {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  strasse: string;
  hausnummer: string;
  hausnummerZusatz: string;
  plz: string;
  ort: string;
  url: string;
  stolpersteinImage: string;
  stolpersteinThumbImage: string;
  sortValue: string;
}
