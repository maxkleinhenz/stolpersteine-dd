import Stolperstein from 'src/models/stolperstein.model';

export type State = {
  windowsWidth: number;
  isMapSidebarVisible: boolean;
  stolpersteine: Array<Stolperstein>;
  stolpersteineSearchText: string;
  selectedStolpersteine: Array<Stolperstein> | undefined;
};

export const state: State = {
  windowsWidth: 0,
  isMapSidebarVisible: false,
  stolpersteine: [],
  stolpersteineSearchText: '',
  selectedStolpersteine: [],
};
