import { GroupedStolpersteinFeature, StolpersteinFeature } from "~~/models/stolperstein.model";

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
