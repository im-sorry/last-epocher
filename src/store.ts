import { createStore } from 'vuex';
import { getBagMatrix, isSameItemInBag } from './utils/item';
import tempPersons from './temp/persons.json';
import { message } from 'ant-design-vue';
import { BAG_TYPE } from './constants/character';

export default createStore<Store>({
  state() {
    return {
      persons: [], //tempPersons as Person[],
      fileNames: [],
      currentPersonIndex: 0,
      currentItem: null,
      showApplyButton: false,
      showItemDBModal: false,
    };
  },
  getters: {
    matrix(state) {
      const bagItems = state.persons[
        state.currentPersonIndex
      ].savedItems.filter((item) => {
        return item.containerID === BAG_TYPE.背包;
      });
      return getBagMatrix(bagItems);
    },
    person(state) {
      return state.persons[state.currentPersonIndex];
    },
  },
  mutations: {
    setShowItemDBModal(state, is: boolean) {
      state.showItemDBModal = is;
    },
    addPerson(state, persons: Person[]) {
      state.persons = [...state.persons, ...persons];
    },
    addFileName(state, filenames: string[]) {
      state.fileNames = [...state.fileNames, ...filenames];
    },
    setCurrentPersonIndex(state, index: number) {
      state.currentPersonIndex = index;
      state.currentItem = null;
    },
    setCurrentItem(state, item: Item | null) {
      if (item && state.currentItem) {
        if (isSameItemInBag(item, state.currentItem)) return;
      }
      state.showItemDBModal = false;
      state.currentItem = item;
    },
    setApplyButton(state, is) {
      state.showApplyButton = is;
    },
    updateItem(state, item: Item) {
      const person = state.persons[state.currentPersonIndex];
      const index = person.savedItems.findIndex((_item) =>
        isSameItemInBag(_item, item)
      );
      if (index === -1) {
        message.error('未找到相应物品，请刷新重试');
        return;
      }
      state.persons[state.currentPersonIndex].savedItems[index].data =
        item.data;
    },
  },
});
