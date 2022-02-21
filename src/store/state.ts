import Stolperstein, {
  StolpersteinFeature,
} from 'src/models/stolperstein.model';

export class RootState {
  windowsWidth = 0;
  isMapSidebarVisible = false;
  stolpersteine: Array<StolpersteinFeature> = [];
  stolpersteineSearchText = '';
  selectedStolpersteine: Array<Stolperstein> | undefined = undefined;
}
