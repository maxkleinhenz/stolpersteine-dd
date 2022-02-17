import Point from './point.model';

export default interface Stolperstein {
  id: number;
  name: string;
  strasse: string;
  hausnummer: string;
  hausnummerZusatz: string;
  plz: string;
  ort: string;
  url: string;
  point: Point;
}
