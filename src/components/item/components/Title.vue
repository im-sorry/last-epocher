<script setup lang="ts">
import { computed } from 'vue'
import { getItemDetail } from '@/utils/item';

import { useStore } from '@/utils/hooks';

const store = useStore();
const currentItem = computed(() => store.state.currentItem);
const {
  name,
  color,
  quality,
  x,
  y
} = getItemDetail(currentItem.value!);
</script>

<template>
  <div class="title" :style="{ color }">({{ quality }}){{ name }}</div>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 20px;
}
</style>
