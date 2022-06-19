import { useStore as _useStore } from 'vuex';

export const useStore = () => {
  return _useStore<Store>();
};
