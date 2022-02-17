import axios from 'axios';
import { store } from 'quasar/wrappers';
import { StolpersteinResult } from 'src/models/stolperstein-result.model';
import Stolperstein from 'src/models/stolperstein.model';
import {
  createStore,
  Module,
  createComposable,
  Getters,
  Mutations,
  Actions,
} from 'vuex-smart-module';

export class RootState {
  windowsWidth = 0;
  isMapSidebarVisible = false;
  stolpersteine: Array<Stolperstein> = [];
  stolpersteineSearchText = '';
  selectedStolpersteine: Array<Stolperstein> | undefined = undefined;
}

class RootMutations extends Mutations<RootState> {
  setStolpersteine(payload: Stolperstein[]) {
    this.state.stolpersteine = payload;
  }
  setStolpersteinSearchText(payload: string) {
    this.state.stolpersteineSearchText = payload.trim();
  }
  selectStolpersteine(payload: Array<Stolperstein> | undefined) {
    this.state.selectedStolpersteine = payload;
  }
}

class RootActions extends Actions<RootState, RootGetters, RootMutations> {
  async loadStolpersteine() {
    if (this.state.stolpersteine?.length > 0) {
      return this.state.stolpersteine;
    }

    return await axios
      .get<StolpersteinResult>(
        'https://kommisdd.dresden.de/net4/public/ogcapi/collections/L1223/items?limit=500'
      )
      .then((response) => {
        const stolpersteine: Array<Stolperstein> = [];
        response.data.features.forEach((feature) => {
          stolpersteine.push({
            id: feature.properties.id,
            name: feature.properties.einrichtung,
            strasse: feature.properties.strasse,
            hausnummer: feature.properties.hnr,
            hausnummerZusatz: feature.properties.hnrz,
            plz: feature.properties.plz,
            ort: 'Dresden',
            url: feature.properties.url,
            point: {
              lon: feature.geometry.coordinates[0],
              lat: feature.geometry.coordinates[1],
            },
          });
        });
        return stolpersteine.sort((a, b) => (a.name < b.name ? -1 : 1));
      })
      .then((stolpersteine) => {
        this.mutations.setStolpersteine(stolpersteine);
      });
  }
}

class RootGetters extends Getters<RootState> {
  filteredStolpersteine() {
    if (this.state.stolpersteineSearchText.length <= 0) {
      return this.state.stolpersteine;
    }

    return this.state.stolpersteine.filter((s) => {
      const containsName = s.name
        .toLowerCase()
        .includes(this.state.stolpersteineSearchText.toLowerCase());

      const anschrift = `${s.strasse} ${s.hausnummer} ${s.plz}`;
      const containAnschrift = anschrift
        ? anschrift
            .toLowerCase()
            .includes(this.state.stolpersteineSearchText.toLowerCase())
        : false;

      return containsName || containAnschrift;
    });
  }

  selectedStolpersteine() {
    return this.state.selectedStolpersteine;
  }
}

const rootConfig = {
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
};

export const root = new Module(rootConfig);

export default store(function (/* { ssrContext } */) {
  const rootStore = createStore(root, {
    strict: !!process.env.DEBUGGING,
    // plugins: []
    // and other options, normally passed to Vuex `createStore`
  });

  return rootStore;
});

export const useStore = createComposable(root);
