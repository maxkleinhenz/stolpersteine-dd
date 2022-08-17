import { defineStore } from 'pinia';

export const usePositionStore = defineStore('position', {
  state: () => ({
    followPosition: false,
    watchActiv: false,
  }),
});
