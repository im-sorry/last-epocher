<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/utils/hooks';
import SliderVue from '@/components/BaseComponents/Slider.vue';

const startIndex = 8;
const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const onChange = (index: number, value: number) => {
  currentItem.value.data[startIndex + index] = value;
};
const toTop = () => {
  for (let idx = startIndex + 1; idx <= startIndex + 8; idx++) {
    currentItem.value.data[idx] = 255;
  }
}
</script>

<template>
  <div class="wrapper-base-roll">
    <div class="attribute-title flex-between">装备属性roll值<a-button size="small" @click="toTop">全部拉满</a-button>
    </div>
    <SliderVue v-for="item in 8" :max="255" :min="0" :value="currentItem.data[item + startIndex]"
      :onChange="(val: number) => onChange(item, val)" />
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
