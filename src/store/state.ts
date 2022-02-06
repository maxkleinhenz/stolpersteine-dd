import Stolperstein from "@/models/stolperstein.model";

export type State = {
  windowsWidth: number;
  stolpersteine: Array<Stolperstein>;
  stolpersteineSearchText: string;
  selectedStolpersteine: Array<Stolperstein> | undefined;
};

export const state: State = {
  windowsWidth: 0,
  stolpersteine: [],
  stolpersteineSearchText: "",
  selectedStolpersteine: [],
};
