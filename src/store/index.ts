import { store } from 'quasar/wrappers';
import { createStore, Module, createComposable } from 'vuex-smart-module';
import { RootActions } from './actions';
import { RootGetters } from './getters';
import { RootMutations } from './mutations';
import { RootState } from './state';

const rootConfig = {
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
};

export const root = new Module(rootConfig);

export default store(function (/* { ssrContext } */) {
  const rootStore = createStore(root, {
    strict: !!process.env.DEBUGGING,
    // plugins: []
    // and other options, normally passed to Vuex `createStore`
  });

  return rootStore;
});

export const useStore = createComposable(root);
