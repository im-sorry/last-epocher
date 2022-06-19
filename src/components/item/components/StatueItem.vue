<script setup lang="ts">
import { ref, computed } from 'vue'
import { isStatue } from '@/utils/item';
import Title from './Title.vue';
import AffixVue from './Affix.vue';

import { useStore } from '@/utils/hooks';

const store = useStore();
const currentItem = computed(() => store.state.currentItem);

</script>

<template>
  <div class="wrapper-statue-item">
    <Title />
    <AffixVue :start-index="8" />
  </div>
</template>

<style scoped>
</style>
