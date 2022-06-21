<script setup lang="ts">
import { ref, computed } from 'vue'
import { getItemDetail } from '@/utils/item';
import Title from './Title.vue';

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
  <div class="wrapper-key-item">
    <Title />
  </div>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 20px;
}
</style>
