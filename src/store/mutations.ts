import Stolperstein from "@/models/stolperstein.model";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationTypes {
  INC_COUNTER = "SET_COUNTER",
  SET_STOLPERSTEINE = "SET_STOLPERSTEINE",
  SET_STOLPERSTEINE_SEARCH_TEXT = "SET_STOLPERSTEINE_SEARCH_TEXT",
  SELECT_STOLPERSTEIN = "SELECT_STOLPERSTEIN",
}

export type Mutations<S = State> = {
  [MutationTypes.INC_COUNTER](state: S, payload: number): void;
  [MutationTypes.SET_STOLPERSTEINE](
    state: S,
    payload: Array<Stolperstein>
  ): void;
  [MutationTypes.SET_STOLPERSTEINE_SEARCH_TEXT](
    state: S,
    payload: string
  ): void;
  [MutationTypes.SELECT_STOLPERSTEIN](state: S, payload: Stolperstein): void;
};

//define mutations
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.INC_COUNTER](state: State, payload: number) {
    state.counter += payload;
  },
  [MutationTypes.SET_STOLPERSTEINE](
    state: State,
    payload: Array<Stolperstein>
  ) {
    state.stolpersteine = payload;
  },
  [MutationTypes.SET_STOLPERSTEINE_SEARCH_TEXT](state: State, payload: string) {
    state.stolpersteineSearchText = payload;
  },
  [MutationTypes.SELECT_STOLPERSTEIN](state: State, payload: Stolperstein) {
    state.selectedStolperstein = payload;
  },
};
