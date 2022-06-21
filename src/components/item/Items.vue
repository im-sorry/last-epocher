<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useStore } from '@/utils/hooks';
import ItemShower from './ItemShower.vue';
import ItemGrid from './ItemGrid.vue';
import { BAG_TYPE } from '@/constants/character';

const store = useStore();
const bagItems = computed(() => store.state.persons[store.state.currentPersonIndex].savedItems.filter(item => {
  return item.containerID === BAG_TYPE.背包;
}));
const hasBagItem = computed(() => Boolean(bagItems.value.length));
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
      bagHeight.value = offsetHeight * 0.9;
      bagWidth.value = bagHeight.value / 8 * 14;
    } else {
      bagWidth.value = offsetWidth * 0.8
      bagHeight.value = bagWidth.value / 14 * 8;
    }
    showGrid.value = true;
  })
})
</script>

<template>
  <div class="wrapper">
    <div class="body flex-center">人物装备(开发中...)</div>
    <div class="bag flex-center" ref="bagDiv">
      <div v-if="showGrid" :style="{ width: `${bagWidth}px`, height: `${bagHeight}px` }">
        <ItemGrid :has-item="hasBagItem">
          <template v-if="hasBagItem">
            <ItemShower v-for="(item, index) in bagItems" :key="`${item.data[3]}-${index}`" :item="item" />
          </template>
        </ItemGrid>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  height: 100%;
  background-color: black;
  overflow-x: auto;

  .body,
  .bag {
    width: 100%;
    height: 50%;
    min-width: 700px;
    box-sizing: border-box;
  }

  .body {
    border-bottom: 1px solid white;
  }
}
</style>
