import axios from 'axios';
import { StolpersteinResult } from 'src/models/stolperstein-result.model';
import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { Actions } from 'vuex-smart-module';
import { RootState } from './state';
import { RootGetters } from './getters';
import { RootMutations } from './mutations';

export class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations
> {
  async loadStolpersteineFeatures() {
    if (this.state.stolpersteine?.length > 0) {
      return this.state.stolpersteine;
    }

    return await axios
      .get<StolpersteinResult>(
        'https://kommisdd.dresden.de/net4/public/ogcapi/collections/L1223/items?limit=500'
      )
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
            },
            geometry: responseFeature.geometry,
          };
          stolpersteineFeatures.push(newFeature);
        });

        // sort by name
        return stolpersteineFeatures.sort((a, b) =>
          a.stolperstein.name < b.stolperstein.name ? -1 : 1
        );
      })
      .then((stolpersteineFeatures) => {
        this.mutations.setStolpersteine(stolpersteineFeatures);
      });
  }
}
