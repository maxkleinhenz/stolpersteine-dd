import { defineStore } from 'pinia';

export const usePositionStore = defineStore('position', {
  state: () => ({
    position: undefined as GeolocationPosition | undefined,
    followPosition: false,
    watchActiv: false,
  }),
});
