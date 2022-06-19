<script setup lang="ts">
import { BAG_HEIGHT } from '@/constants/character';
import { getItemDetail, copyItem } from '@/utils/item';
import { useStore } from '@/utils/hooks';
import { nextTick } from 'vue';

const store = useStore();
const { item } = defineProps<{ item: Item }>();
const {
  x,
  y,
  w,
  h,
  name,
  color,
  quality
} = getItemDetail(item);

const style = {
  'grid-column-start': x + 1,
  'grid-column-end': x + 1 + w,
  'grid-row-start': BAG_HEIGHT - y + 1 - h,
  'grid-row-end': BAG_HEIGHT - y + 1,
  'background': `radial-gradient(ellipse, rgb(30,30,30) 65%, ${color})`,
  color,
}

const onClick = () => {
  store.commit('setCurrentItem', copyItem(item));
}
</script>

<template>
  <div class="wrapper-item flex-center" :style="style" @click="onClick">
    <span>
      <span style="font-size:0.5em">({{ quality }})</span> {{ name }} </span>
  </div>
</template>

<style scoped>
.wrapper-item {
  background-color: black;
  cursor: pointer;
}
</style>
