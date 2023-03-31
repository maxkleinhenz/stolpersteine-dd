import { defineStore } from "pinia";
import { StolpersteinFeature, StolpersteinResult } from "~~/models/stolperstein.model";

export const useStolpersteinStore = defineStore("stolperstein", () => {
  const stolpersteine = ref<StolpersteinFeature[]>([]);

  async function fetchStolpersteine() {
    const data = await $fetch<StolpersteinResult>("/stolpersteine/stolpersteine.json");
    const features = data.features;
    const stolpersteinFeatures = features.map((feature) => {
      return {
        stolperstein: {
          id: feature.properties.id,
          name: feature.properties.einrichtung,
          firstName: feature.properties.einrichtung.split(", ")[1],
          lastName: feature.properties.einrichtung.split(", ")[0],
          strasse: feature.properties.strasse,
          hausnummer: feature.properties.hnr,
          hausnummerZusatz: feature.properties.hnrz,
          strasseHausnummer:
            [feature.properties.strasse, feature.properties.hnr].join(" ") + (feature.properties.hnrz ?? ""),
          plz: feature.properties.plz,
          ort: "Dresden",
          plzOrt: [feature.properties.plz, "Dresden"].join(" "),
          url: feature.properties.url,
          stolpersteinImage: "",
          stolpersteinThumbImage: "",
          sortValue: feature.properties.einrichtung.toLowerCase(),
        },
        geometry: feature.geometry,
      } as StolpersteinFeature;
    });
    this.stolpersteine = stolpersteinFeatures.sort((a, b) =>
      a.stolperstein.sortValue < b.stolperstein.sortValue ? -1 : 1
    );
  }

  return { stolpersteine, fetchStolpersteine };
});
