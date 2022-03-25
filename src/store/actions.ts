import { Actions } from 'vuex-smart-module';
import { RootState } from './state';
import { RootGetters } from './getters';
import { RootMutations } from './mutations';
import { useStolpersteinUtils } from 'src/common/StolpersteinUtils';

export class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations
> {
  async loadStolpersteineFeatures() {
    if (this.state.stolpersteine?.length > 0) {
      return this.state.stolpersteine;
    }

    //   axios.get<StolpersteinResult>(
    //     'https://kommisdd.dresden.de/net4/public/ogcapi/collections/L1223/items?limit=500'
    // )
    const { loadStolpersteine } = useStolpersteinUtils();
    return await loadStolpersteine().then((stolpersteineFeatures) => {
      this.mutations.setStolpersteine(stolpersteineFeatures);
    });
  }
}
