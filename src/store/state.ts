import { StolpersteinFeature } from 'src/models/stolperstein.model';

export class RootState {
  windowsWidth = 0;
  isStolpersteinSidebarVisible = false;
  stolpersteine: Array<StolpersteinFeature> = [];
  stolpersteineSearchText = '';
  selectedStolpersteine: Array<StolpersteinFeature> | undefined = undefined;
}
