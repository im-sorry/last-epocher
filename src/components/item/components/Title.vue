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
} = getItemDetail(currentItem.value!);
</script>

<template>
  <div class="title" :style="{ color }" :key="`${JSON.stringify(currentItem?.data)}`">{{ quality ? `(${quality})` : ''
  }}{{ name }}</div>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 20px;
}
</style>
