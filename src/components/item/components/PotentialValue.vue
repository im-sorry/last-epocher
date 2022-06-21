<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/utils/hooks';
import { isGreenDress } from '@/utils/item';

const index = 17;
const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const potentialValue = computed(() => currentItem.value.data[index]);
const onChange = (value: number) => {
  currentItem.value.data[index] = value;
};

</script>

<template>
  <div class="wrapper-base-roll" v-if="!isGreenDress(currentItem)">
    <div class="attribute-title">传奇潜能值</div>
    <a-slider :max="4" :min="0" :value="potentialValue" @change="onChange" />
  </div>
</template>

<style scoped>
.wrapper-base-roll {
  padding: 0 10px;
  margin-top: 30px;
}
</style>
