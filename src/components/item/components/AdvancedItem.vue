<script setup lang="ts">
import { computed } from 'vue'
import Title from './Title.vue';
import BaseRollVue from './BaseRoll.vue';
import AdvancedRollVue from './AdvancedRoll.vue';
import PotentialValueVue from './PotentialValue.vue';

import { useStore } from '@/utils/hooks';

const store = useStore();
const currentItem = computed(() => store.state.currentItem);
</script>

<template>
  <div class="wrapper-key-item">
    <Title />
    <BaseRollVue />
    <PotentialValueVue />
    <AdvancedRollVue />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
