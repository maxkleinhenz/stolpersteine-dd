import Stolperstein from "@/models/stolperstein.model";
import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import axios from "axios";
import { State } from "./state";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export enum ActionTypes {
  INC_COUNTER = "SET_COUNTER",
  LOAD_STOLPERSTEINE = "LOAD_STOLPERSTEINE",
}

export interface Actions {
  [ActionTypes.INC_COUNTER](
    { commit }: AugmentedActionContext,
    payload: number
  ): void;
  [ActionTypes.LOAD_STOLPERSTEINE]({
    commit,
  }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.INC_COUNTER]({ commit }, payload: number) {
    commit(MutationTypes.INC_COUNTER, payload);
  },
  [ActionTypes.LOAD_STOLPERSTEINE]({ commit }) {
    return new Promise<void>((resolve) => {
      axios
        .get(
          "https://kommisdd.dresden.de/net4/public/ogcapi/collections/L1223/items?limit=500"
        )
        .then((response) => {
          const stolpersteine: Array<Stolperstein> = [];
          response.data.features.forEach((feature: any) => {
            stolpersteine.push({
              id: <number>feature.properties.id,
              name: <string>feature.properties.einrichtung,
              strasse: <string>feature.properties.strasse,
              hausnummer: <string>feature.properties.hnr,
              hausnummerZusatz: <string>feature.properties.hnrz,
              plz: <string>feature.properties.plz,
              ort: "Dresden",
              url: <string>feature.properties.url,
              point: {
                lon: <number>feature.geometry.coordinates[0],
                lat: <number>feature.geometry.coordinates[1],
              },
            });
          });
          return stolpersteine.sort((a, b) => (a.name < b.name ? -1 : 1));
        })
        .then((stolpersteine) => {
          commit(MutationTypes.SET_STOLPERSTEINE, stolpersteine);
        });
      resolve();
    });
  },
};
