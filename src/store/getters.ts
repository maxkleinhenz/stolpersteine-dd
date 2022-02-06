import { Device } from "@/enums/device.enum";
import Stolperstein from "@/models/stolperstein.model";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  currentDevice(state: State): Device;
  filteredStolpersteine(state: State): Array<Stolperstein>;
  selectedStolpersteine(state: State): Array<Stolperstein> | undefined;
};

//getters
export const getters: GetterTree<State, State> & Getters = {
  currentDevice: (state: State) => {
    if (state.windowsWidth <= 768) return Device.Mobile;
    if (state.windowsWidth <= 992) return Device.Tablet;
    return Device.Desktop;
  },
  filteredStolpersteine: (state) => {
    if (state.stolpersteineSearchText.length <= 0) {
      return state.stolpersteine;
    }

    return state.stolpersteine.filter((s) => {
      const containsName = s.name
        .toLowerCase()
        .includes(state.stolpersteineSearchText.toLowerCase());

      const anschrift = `${s.strasse} ${s.hausnummer} ${s.plz}`;
      const containAnschrift = anschrift
        ? anschrift
            .toLowerCase()
            .includes(state.stolpersteineSearchText.toLowerCase())
        : false;

      return containsName || containAnschrift;
    });
  },
  selectedStolpersteine: (state) => {
    return state.selectedStolpersteine;
  },
};
