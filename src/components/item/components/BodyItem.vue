<script setup lang="ts">
import { getItemDetail, copyItem } from '@/utils/item';
import { useStore } from '@/utils/hooks';

const store = useStore();

const { item } = defineProps<{ item: Item | undefined }>();

const {
  name,
  color,
  quality
} = getItemDetail(item);

const style = {
  'background': color ? `radial-gradient(ellipse, rgb(30,30,30) 65%, ${color})` : 'black',
  color,
}

const onClick = () => {
  if (!item) return;
  store.commit('setCurrentItem', copyItem(item));
}
</script>

<template>
  <div class="wrapper-item flex-center" :style="style" @click="onClick">
    <span>
      <span style="font-size:0.5em">{{ quality ? `(${quality})` : '' }}</span> {{ name }} </span>
  </div>
</template>

<style scoped>
.wrapper-item {
  cursor: pointer;
  height: 100%;
  border: 2px solid rgb(60, 58, 44);
}
</style>
