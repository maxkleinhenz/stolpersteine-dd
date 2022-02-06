import Stolperstein from "@/models/stolperstein.model";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationTypes {
  SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH",
  SET_STOLPERSTEINE = "SET_STOLPERSTEINE",
  SET_STOLPERSTEINE_SEARCH_TEXT = "SET_STOLPERSTEINE_SEARCH_TEXT",
  SELECT_STOLPERSTEINE = "SELECT_STOLPERSTEINE",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_WINDOW_WIDTH](state: S, payload: number): void;
  [MutationTypes.SET_STOLPERSTEINE](
    state: S,
    payload: Array<Stolperstein>
  ): void;
  [MutationTypes.SET_STOLPERSTEINE_SEARCH_TEXT](
    state: S,
    payload: string
  ): void;
  [MutationTypes.SELECT_STOLPERSTEINE](
    state: S,
    payload: Array<Stolperstein> | undefined
  ): void;
};

//define mutations
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_WINDOW_WIDTH](state: State, payload: number) {
    state.windowsWidth = payload;
  },
  [MutationTypes.SET_STOLPERSTEINE](
    state: State,
    payload: Array<Stolperstein>
  ) {
    state.stolpersteine = payload;
  },
  [MutationTypes.SET_STOLPERSTEINE_SEARCH_TEXT](state: State, payload: string) {
    state.stolpersteineSearchText = payload.trim();
  },
  [MutationTypes.SELECT_STOLPERSTEINE](
    state: State,
    payload: Array<Stolperstein> | undefined
  ) {
    state.selectedStolpersteine = payload;
  },
};
