<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from '@/utils/hooks';

const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const onChange = (index: number, value: number) => {
  currentItem.value.data[index] = value;
};

</script>

<template>
  <div class="wrapper-base-roll">
    <div class="title">基底roll值</div>
    <a-slider :max="255" :min="0" :value="currentItem.data[4]" @change="(val: number) => onChange(4, val)" />
    <a-slider :max="255" :min="0" :value="currentItem.data[5]" @change="(val: number) => onChange(5, val)" />
    <a-slider :max="255" :min="0" :value="currentItem.data[6]" @change="(val: number) => onChange(6, val)" />
  </div>
</template>

<style scoped>
.wrapper-base-roll {
  padding: 0 10px;
  margin-top: 20px;
}

.title {
  color: aliceblue;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
}
</style>
