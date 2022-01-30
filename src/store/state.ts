import Stolperstein from "@/models/stolperstein.model";

export type State = {
  counter: number;
  stolpersteine: Array<Stolperstein>;
  stolpersteineSearchText: string;
  selectedStolperstein: Stolperstein | null;
};

export const state: State = {
  counter: 0,
  stolpersteine: [],
  stolpersteineSearchText: "",
  selectedStolperstein: null,
};
