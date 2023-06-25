import { StolpersteinFeature, StolpersteinResult } from "~~/models/stolperstein.model";
import data from "../api/stolpersteine/stolpersteine.json";

export function findStolpersteinById(
  id: number | undefined,
  source: StolpersteinFeature[]
): StolpersteinFeature | undefined {
  if (!id) return undefined;

  const stolperstein = source.find((s) => {
    return s.stolperstein.id === id;
  });
  return stolperstein;
}

export function getStolpersteine() {
  return transformStolpersteine(data as unknown as StolpersteinResult);
}

function transformStolpersteine(result: StolpersteinResult): StolpersteinFeature[] {
  const config = useRuntimeConfig();

  const features = result.features;
  const stolpersteinFeatures = features.map((feature) => {
    return {
      stolperstein: {
        id: feature.properties.id,
        name: feature.properties.einrichtung,
        firstName: feature.properties.einrichtung.split(", ")[1],
        lastName: feature.properties.einrichtung.split(", ")[0],
        strasse: feature.properties.strasse,
        hausnummer: feature.properties.hnr,
        hausnummerZusatz: feature.properties.hnrz,
        strasseHausnummer:
          [feature.properties.strasse, feature.properties.hnr].join(" ") + (feature.properties.hnrz ?? ""),
        plz: feature.properties.plz,
        ort: "Dresden",
        plzOrt: [feature.properties.plz, "Dresden"].join(" "),
        url: feature.properties.url,
        stolpersteinImage: config.app.baseURL + "stolpersteine/images/default.jpg",
        stolpersteinThumbImage: config.app.baseURL + "/stolpersteine/images/thumb.jpg",
        sortValue: feature.properties.einrichtung.toLowerCase(),
      },
      geometry: feature.geometry,
    } as StolpersteinFeature;
  });
  const stolpersteine = stolpersteinFeatures.sort((a, b) =>
    a.stolperstein.sortValue < b.stolperstein.sortValue ? -1 : 1
  );

  return stolpersteine;
}
