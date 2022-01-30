import Stolperstein from "@/models/stolperstein.model";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  filteredStolpersteine(state: State): Array<Stolperstein>;
  selectedStolperstein(state: State): Stolperstein | null;
};

//getters
export const getters: GetterTree<State, State> & Getters = {
  filteredStolpersteine: (state) => {
    if (state.stolpersteineSearchText.length <= 0) {
      return state.stolpersteine;
    }

    return state.stolpersteine.filter((s) => {
      const containsName = s.name
        .toLowerCase()
        .includes(state.stolpersteineSearchText.toLowerCase());

      const containsStrasse = s.strasse
        ? s.strasse
            .toLowerCase()
            .includes(state.stolpersteineSearchText.toLowerCase())
        : false;

      const containsHausnummer = s.hausnummer
        ? s.hausnummer
            .toString()
            .includes(state.stolpersteineSearchText.toLowerCase())
        : false;

      const containsPlz = s.plz
        ? s.plz
            .toLowerCase()
            .includes(state.stolpersteineSearchText.toLowerCase())
        : false;

      return (
        containsName || containsStrasse || containsPlz || containsHausnummer
      );
    });
  },
  selectedStolperstein: (state) => {
    return state.selectedStolperstein;
  },
};
