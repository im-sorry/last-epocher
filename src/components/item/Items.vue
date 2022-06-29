<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useStore } from '@/utils/hooks';
import ItemShower from './ItemShower.vue';
import ItemGrid from './ItemGrid.vue';
import BodyVue from './Body.vue';
import { BAG_TYPE } from '@/constants/character';
import { BAG_HEIGHT } from '@/constants/character';
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import DBDrawer from './db/Drawer.vue';

const store = useStore();
const bagItems = computed(() => store.state.persons[store.state.currentPersonIndex].savedItems.filter(item => {
  return item.containerID === BAG_TYPE.背包;
}));
const hasBagItem = computed(() => Boolean(bagItems.value.length));
const getKey = (item: Item) => {
  return `${JSON.stringify(item.data)}-${JSON.stringify(item.inventoryPosition)}`
}
const showGrid = ref(false);
const bagDiv = ref<HTMLDivElement>();
const bagWidth = ref(0);
const bagHeight = ref(0);

onMounted(() => {
  nextTick(() => {
    if (!bagDiv.value) return;
    const offsetWidth = bagDiv.value.offsetWidth;
    const offsetHeight = bagDiv.value.offsetHeight;
    if (offsetHeight < offsetWidth) {
      bagHeight.value = offsetHeight * 1;
      bagWidth.value = bagHeight.value / 8 * 14;
    } else {
      bagWidth.value = offsetWidth * 1
      bagHeight.value = bagWidth.value / 14 * 8;
    }
    showGrid.value = true;
  })
})
const onAddItem = () => {
  store.commit('setShowItemDBModal', true)
}
</script>

<template>
  <div class="wrapper">
    <div class="body flex-center">
      <BodyVue />
    </div>
    <div class="bag-buttons flex-center">
      <div :style="{ width: `${bagWidth}px`, height: '100%', textAlign: 'left' }">
        <a-button type="text" class="bag-tool-button" @click="onAddItem">
          <PlusCircleOutlined />添加物品
        </a-button>
      </div>
    </div>
    <div class="bag flex-center" ref="bagDiv">
      <div v-if="showGrid" :style="{ width: `${bagWidth}px`, height: `${bagHeight}px`, overflow: 'hidden' }">
        <ItemGrid :has-item="hasBagItem" :X="14" :Y="8" :borders="['left', 'right', 'top']">
          <template v-if="hasBagItem">
            <ItemShower v-for="(item, index) in bagItems" :key="getKey(item)" :item="item" :height="BAG_HEIGHT"
              :is-in-bag="true" />
          </template>
        </ItemGrid>
      </div>
    </div>
    <DBDrawer />
  </div>
</template>

<style scoped lang="less">
.wrapper {
  height: 100%;
  background-color: black;
  overflow-x: auto;

  .bag-buttons {
    height: 30px;

    .bag-tool-button {
      color: var(--base-color);
    }
  }

  .body,
  .bag {
    width: 100%;
    height: calc(50% - 15px);
    min-width: 700px;
    box-sizing: border-box;
  }

  .body {
    border-bottom: 1px solid rgba(222, 222, 222, .5);
  }
}
</style>
