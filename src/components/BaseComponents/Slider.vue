<script setup lang="ts">
import { ref } from 'vue'

const { onChange, max, min, value } = defineProps<{ onChange: (val: number) => void; max: number; min: number; value: number; }>();
const count = ref(value);
</script>

<template>
  <a-slider class="slider" :max="max" :min="min" v-model:value="count" @after-change="onChange" />
</template>
