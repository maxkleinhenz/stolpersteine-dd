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

export function findStolpersteineAtCoords(coordinates: [number, number], source: StolpersteinFeature[]) {
  return source.filter((feature) => {
    return feature.geometry.coordinates[0] === coordinates[0] && feature.geometry.coordinates[1] === coordinates[1];
  });
}

export async function loadStolpersteine(reload: boolean = false) {
  const store = useStolpersteinStore();
  if (reload || !store.stolpersteine || store.stolpersteine.length < 1) {
    const { data } = await useFetch<StolpersteinFeature[]>("/api/stolpersteine", {
      key: "stolpersteine",
      cache: "force-cache",
    });

    if (data.value) {
      store.stolpersteine = data.value;
    }
  }
  return store.stolpersteine;
}

export async function loadStolperstein(id: number) {
  const { data } = await useFetch<StolpersteinFeature>(`/api/stolpersteine/${id}`, {
    key: `stolperstein-${id}`,
    cache: "force-cache",
  });

  if (data.value) return data.value;
  return undefined;
}
