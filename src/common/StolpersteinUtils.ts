import axios from 'axios';
import { StolpersteinResult } from 'src/models/stolperstein-result.model';
import {
  GroupedStolpersteinFeature,
  StolpersteinFeature,
} from 'src/models/stolperstein.model';

export const useStolpersteinUtils = () => {
  return {
    loadStolpersteine,
    groupStolpersteinByCoords,
    findStolpersteineAtCoords,
  };
};

const loadStolpersteine = async () => {
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
            strasse: responseFeature.properties.strasse,
            hausnummer: responseFeature.properties.hnr,
            hausnummerZusatz: responseFeature.properties.hnrz,
            plz: responseFeature.properties.plz,
            ort: 'Dresden',
            url: responseFeature.properties.url,
            sortValue: responseFeature.properties.einrichtung.toLowerCase(),
          },
          geometry: responseFeature.geometry,
        };
        stolpersteineFeatures.push(newFeature);
      });

      // sort by name
      return stolpersteineFeatures.sort((a, b) =>
        a.stolperstein.sortValue < b.stolperstein.sortValue ? -1 : 1
      );
    });
};

const groupStolpersteinByCoords = (
  stolpersteinFeatures: Array<StolpersteinFeature>
) => {
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
};

const findStolpersteineAtCoords = (
  coordinates: [number, number],
  source: StolpersteinFeature[]
) => {
  return source.filter((feature) => {
    return (
      feature.geometry.coordinates[0] === coordinates[0] &&
      feature.geometry.coordinates[1] === coordinates[1]
    );
  });
};
