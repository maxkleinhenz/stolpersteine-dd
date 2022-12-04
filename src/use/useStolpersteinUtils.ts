import axios from 'axios';
import { StolpersteinResult } from 'src/models/stolperstein-result.model';
import {
  GroupedStolpersteinFeature,
  StolpersteinFeature,
} from 'src/models/stolperstein.model';

export function useStolpersteinUtils() {
  return {
    loadStolpersteine,
    groupStolpersteinByCoords,
    findStolpersteinById,
    findStolpersteineAtCoords,
  };
}

async function loadStolpersteine() {
  return await axios
    .get<StolpersteinResult>('data/stolpersteine.json')
    .then((response) => {
      const stolpersteineFeatures: Array<StolpersteinFeature> = [];
      response.data.features.forEach((responseFeature) => {
        // create stolperstein feature from response
        const newFeature: StolpersteinFeature = {
          stolperstein: {
            id: responseFeature.properties.id,
            name: responseFeature.properties.einrichtung,
            firstName: responseFeature.properties.einrichtung.split(', ')[1],
            lastName: responseFeature.properties.einrichtung.split(', ')[0],
            strasse: responseFeature.properties.strasse,
            hausnummer: responseFeature.properties.hnr,
            hausnummerZusatz: responseFeature.properties.hnrz,
            plz: responseFeature.properties.plz,
            ort: 'Dresden',
            url: responseFeature.properties.url,
            stolpersteinImage: '',
            stolpersteinThumbImage: '',
            sortValue: responseFeature.properties.einrichtung.toLowerCase(),
          },
          geometry: responseFeature.geometry,
        };
        newFeature.stolperstein.stolpersteinImage = `images/stolpersteine/${
          newFeature.stolperstein.lastName
        }-${newFeature.stolperstein.firstName.replace('Dr. ', '')}.jpg`;

        newFeature.stolperstein.stolpersteinThumbImage =
          newFeature.stolperstein.stolpersteinImage.replace(
            'images/stolpersteine/',
            'images/stolpersteine/thumb-150/'
          );
        stolpersteineFeatures.push(newFeature);
      });

      // sort by name
      return stolpersteineFeatures.sort((a, b) =>
        a.stolperstein.sortValue < b.stolperstein.sortValue ? -1 : 1
      );
    });
}

function groupStolpersteinByCoords(
  stolpersteinFeatures: Array<StolpersteinFeature>
) {
  const grouped: Array<GroupedStolpersteinFeature> = [];

  stolpersteinFeatures.forEach((stolpersteinFeature) => {
    // check whether response stolperstein coordinates already exists in stolpersteinFeatureCollection
    const existsFeature = grouped.filter((feature) => {
      return (
        feature.geometry.coordinates[0] ===
          stolpersteinFeature.geometry.coordinates[0] &&
        feature.geometry.coordinates[1] ===
          stolpersteinFeature.geometry.coordinates[1]
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

function findStolpersteinById(
  id: number,
  source: StolpersteinFeature[]
): StolpersteinFeature | undefined {
  const found = source.filter((s) => {
    return s.stolperstein.id === id;
  });
  if ((found?.length ?? 0) > 0) return found[0];

  return undefined;
}

function findStolpersteineAtCoords(
  coordinates: [number, number],
  source: StolpersteinFeature[]
) {
  return source.filter((feature) => {
    return (
      feature.geometry.coordinates[0] === coordinates[0] &&
      feature.geometry.coordinates[1] === coordinates[1]
    );
  });
}
