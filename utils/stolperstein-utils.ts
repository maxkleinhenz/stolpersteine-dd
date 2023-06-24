import { useStolpersteinStore } from "~/stores/stolperstein-store";
import { GroupedStolpersteinFeature, StolpersteinFeature, StolpersteinResult } from "~~/models/stolperstein.model";

export function groupStolpersteinByCoords(stolpersteinFeatures: StolpersteinFeature[]) {
  const grouped: Array<GroupedStolpersteinFeature> = [];

  stolpersteinFeatures.forEach((stolpersteinFeature) => {
    // check whether response stolperstein coordinates already exists in stolpersteinFeatureCollection
    const existsFeature = grouped.filter((feature) => {
      return (
        feature.geometry.coordinates[0] === stolpersteinFeature.geometry.coordinates[0] &&
        feature.geometry.coordinates[1] === stolpersteinFeature.geometry.coordinates[1]
      );
    });

    // when feature exists append stolperstein to proterties
    // otherwise create new feature
    if (existsFeature?.length > 0) {
      existsFeature[0].properties.push(stolpersteinFeature);
    } else {
      grouped.push({
        properties: [stolpersteinFeature],
        geometry: stolpersteinFeature.geometry,
      });
    }
  });

  return grouped;
}

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

export function findStolpersteineAtCoords(coordinates: [number, number], source: StolpersteinFeature[]) {
  return source.filter((feature) => {
    return feature.geometry.coordinates[0] === coordinates[0] && feature.geometry.coordinates[1] === coordinates[1];
  });
}

export async function loadStolpersteine(reload: boolean = false) {
  const store = useStolpersteinStore();
  if (reload || !store.stolpersteine || store.stolpersteine.length < 1) {
    const { data } = await useFetch<StolpersteinResult>("/api/stolpersteine", {
      key: "stolpersteine",
      cache: "force-cache",
    });

    setStolpersteine(data.value);
  }
  return store.stolpersteine;
}

function setStolpersteine(result: StolpersteinResult | undefined | null) {
  if (!result) return;

  const store = useStolpersteinStore();

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
        stolpersteinImage: "/stolpersteine/images/default.jpg",
        stolpersteinThumbImage: "/stolpersteine/images/thumb.jpg",
        sortValue: feature.properties.einrichtung.toLowerCase(),
      },
      geometry: feature.geometry,
    } as StolpersteinFeature;
  });
  const stolpersteine = stolpersteinFeatures.sort((a, b) =>
    a.stolperstein.sortValue < b.stolperstein.sortValue ? -1 : 1
  );

  store.stolpersteine = stolpersteine;
}
