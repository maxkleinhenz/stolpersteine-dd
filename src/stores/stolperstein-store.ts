import { defineStore } from 'pinia';
import { useStolpersteinUtils } from 'src/common/StolpersteinUtils';
import { StolpersteinFeature } from 'src/models/stolperstein.model';

export const useStolpersteinStore = defineStore('stolperstein', {
  state: () => ({
    windowsWidth: 0,
    isStolpersteinSidebarVisible: false,
    stolpersteine: [] as Array<StolpersteinFeature>,
    stolpersteineSearchText: '',
    selectedStolpersteine: undefined as Array<StolpersteinFeature> | undefined,
  }),
  actions: {
    async loadStolpersteineFeatures(): Promise<void | StolpersteinFeature[]> {
      if (this.stolpersteine?.length > 0) {
        return this.stolpersteine;
      }

      //   axios.get<StolpersteinResult>(
      //     'https://kommisdd.dresden.de/net4/public/ogcapi/collections/L1223/items?limit=500'
      // )
      const { loadStolpersteine } = useStolpersteinUtils();
      return await loadStolpersteine().then((stolpersteineFeatures) => {
        this.stolpersteine = stolpersteineFeatures;
      });
    },
    toggleStolpersteinSidebarVisibility() {
      this.isStolpersteinSidebarVisible = !this.isStolpersteinSidebarVisible;
    },
  },
  getters: {
    filteredStolpersteine(): Array<StolpersteinFeature> {
      if (this.stolpersteineSearchText.length <= 0) {
        return this.stolpersteine;
      }

      return this.stolpersteine.filter((s) => {
        const containsName = s.stolperstein.name
          .toLowerCase()
          .includes(this.stolpersteineSearchText.toLowerCase());

        const anschrift = `${s.stolperstein.strasse} ${s.stolperstein.hausnummer} ${s.stolperstein.plz}`;
        const containAnschrift = anschrift
          ? anschrift
              .toLowerCase()
              .includes(this.stolpersteineSearchText.toLowerCase())
          : false;

        return containsName || containAnschrift;
      });
    },
  },
});
