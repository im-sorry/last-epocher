<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/utils/hooks';

const startIndex = 8;
const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const onChange = (index: number, value: number) => {
  currentItem.value.data[startIndex + index] = value;
};

</script>

<template>
  <div class="wrapper-base-roll">
    <div class="attribute-title">装备属性roll值</div>
    <a-slider v-for="item in 8" :max="255" :min="0" :value="currentItem.data[item + startIndex]"
      @change="(val: number) => onChange(item, val)" />
  </div>
</template>

<style scoped>
.wrapper-base-roll {
  padding: 0 10px;
  margin-top: 30px;
}

.title {
  color: aliceblue;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
}
</style>
