import { createStore } from 'vuex';
import { isSameItemInBag } from './utils/item';
import tempPersons from './temp/persons.json';
import { message } from 'ant-design-vue';

export default createStore<Store>({
  state() {
    return {
      persons: tempPersons as Person[],
      currentPersonIndex: 0,
      hasImported: true,
      currentItem: null,
      showApplyButton: false,
    };
  },
  mutations: {
    setPersons(state, persons: Person[]) {
      state.persons = [...state.persons, ...persons];
      state.hasImported = Boolean(persons.length);
    },
    setCurrentPersonIndex(state, index: number) {
      state.currentPersonIndex = index;
    },
    setCurrentItem(state, item: Item) {
      if (state.currentItem) {
        if (isSameItemInBag(item, state.currentItem)) return;
      }
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
      console.log(index, '=========');
      person.savedItems[index] = item;
      state.persons[state.currentPersonIndex] = { ...person };
    },
  },
});
