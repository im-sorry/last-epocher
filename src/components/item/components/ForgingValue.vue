<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/utils/hooks';

const index = 7;
const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const potentialValue = computed(() => currentItem.value.data[index]);
const onChange = (value: number) => {
  currentItem.value.data[index] = value;
};

</script>

<template>
  <div class="wrapper-base-roll">
    <div class="attribute-title">锻造潜能</div>
    <a-slider :max="255" :min="0" :value="potentialValue" @change="onChange" />
  </div>
</template>

<style scoped>
.wrapper-base-roll {
  padding: 0 10px;
  margin-top: 30px;
}
</style>
