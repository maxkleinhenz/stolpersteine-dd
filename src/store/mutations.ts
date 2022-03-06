import { StolpersteinFeature } from 'src/models/stolperstein.model';
import { Mutations } from 'vuex-smart-module';
import { RootState } from './state';

export class RootMutations extends Mutations<RootState> {
  setStolpersteine(payload: StolpersteinFeature[]) {
    this.state.stolpersteine = payload;
    this.state.selectedStolpersteine = undefined;
  }
  setStolpersteinSearchText(payload: string) {
    this.state.stolpersteineSearchText = payload.trim();
    this.state.selectedStolpersteine = undefined;
  }
  selectStolpersteine(payload: Array<StolpersteinFeature> | undefined) {
    this.state.selectedStolpersteine = payload;
  }
  setStolpersteinSidebarVisibility(payload: boolean) {
    this.state.isStolpersteinSidebarVisible = payload;
  }
  toggleStolpersteinSidebarVisibility() {
    this.state.isStolpersteinSidebarVisible =
      !this.state.isStolpersteinSidebarVisible;
  }
}
