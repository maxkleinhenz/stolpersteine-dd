import { defineStore } from "pinia";
import { StolpersteinFeature } from "~~/models/stolperstein.model";

export const useStolpersteinStore = defineStore("stolperstein", () => {
  const stolpersteine = ref<StolpersteinFeature[]>([]);
  const searchText = ref<string>("");
  const selectedStolpersteine = ref<StolpersteinFeature[] | undefined>(undefined);

  const filteredStolpersteine = computed(() => {
    if (searchText.value.length <= 0) {
      return stolpersteine.value;
    }

    const lowerSearchText = searchText.value.toLowerCase();

    return stolpersteine.value.filter((s) => {
      const containsName = s.stolperstein.name.toLowerCase().includes(lowerSearchText);

      const anschrift = `${s.stolperstein.strasse} ${s.stolperstein.hausnummer} ${s.stolperstein.plz}`;
      const containAnschrift = anschrift ? anschrift.toLowerCase().includes(lowerSearchText) : false;

      return containsName || containAnschrift;
    });
  });

  return {
    stolpersteine,
    searchText,
    selectedStolpersteine,
    filteredStolpersteine,
  };
});
