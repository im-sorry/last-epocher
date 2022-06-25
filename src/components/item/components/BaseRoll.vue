<script setup lang="ts">
import { computed } from 'vue'
import SliderVue from '@/components/BaseComponents/Slider.vue';
import { useStore } from '@/utils/hooks';

const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const onChange = (index: number, value: number) => {
  currentItem.value.data[index] = value;
};
const toTop = () => {
  for (let idx of [4, 5, 6]) {
    currentItem.value.data[idx] = 255;
  }
}

</script>

<template>
  <div class="wrapper-base-roll">
    <div class="attribute-title flex-between"> 基底roll值 <a-button size="small" @click="toTop">全部拉满</a-button>
    </div>
    <SliderVue :max="255" :min="0" :value="currentItem.data[4]" :onChange="(val: number) => onChange(4, val)" />
    <SliderVue :max="255" :min="0" :value="currentItem.data[5]" :onChange="(val: number) => onChange(5, val)" />
    <SliderVue :max="255" :min="0" :value="currentItem.data[6]" :onChange="(val: number) => onChange(6, val)" />
  </div>
</template>

<style scoped>
.wrapper-base-roll {
  padding: 0 10px;
  margin-top: 20px;
}
</style>
