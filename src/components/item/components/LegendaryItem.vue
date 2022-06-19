<script setup lang="ts">
import { ref, computed } from 'vue'
import Title from './Title.vue';
import BaseRollVue from './BaseRoll.vue';
import AffixVue from './Affix.vue';

import { useStore } from '@/utils/hooks';

const store = useStore();
const currentItem = computed(() => store.state.currentItem);

</script>

<template>
  <div class="wrapper-key-item">
    <Title />
    <BaseRollVue />
    <AffixVue :start-index="17" />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
