import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { Getters } from 'vuex-smart-module';
import { RootState } from './state';

export class RootGetters extends Getters<RootState> {
  filteredStolpersteine() {
    if (this.state.stolpersteineSearchText.length <= 0) {
      return this.state.stolpersteine;
    }

    return this.state.stolpersteine.filter((s) => {
      const containsName = s.stolperstein.name
        .toLowerCase()
        .includes(this.state.stolpersteineSearchText.toLowerCase());

      const anschrift = `${s.stolperstein.strasse} ${s.stolperstein.hausnummer} ${s.stolperstein.plz}`;
      const containAnschrift = anschrift
        ? anschrift
            .toLowerCase()
            .includes(this.state.stolpersteineSearchText.toLowerCase())
        : false;

      return containsName || containAnschrift;
    });
  }

  selectedStolpersteine() {
    return this.state.selectedStolpersteine;
  }

  getStolpersteinById(id: number): StolpersteinFeature | undefined {
    const found = this.state.stolpersteine.filter((s) => {
      return s.stolperstein.id === id;
    });
    if (found?.length ?? 0 > 0) return found[0];

    return undefined;
  }
}
