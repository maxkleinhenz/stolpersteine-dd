import Stolperstein, {
  StolpersteinFeature,
} from 'src/models/stolperstein.model';
import { Mutations } from 'vuex-smart-module';
import { RootState } from './state';

export class RootMutations extends Mutations<RootState> {
  setStolpersteine(payload: StolpersteinFeature[]) {
    this.state.stolpersteine = payload;
  }
  setStolpersteinSearchText(payload: string) {
    this.state.stolpersteineSearchText = payload.trim();
  }
  selectStolpersteine(payload: Array<Stolperstein> | undefined) {
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
