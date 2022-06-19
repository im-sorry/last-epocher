<script setup lang="ts">
import Title from './Title.vue';
import BaseRollVue from './BaseRoll.vue';
import AffixVue from './Affix.vue';

</script>

<template>
  <div class="wrapper-key-item">
    <Title />
    <BaseRollVue />
    <AffixVue :start-index="8" />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
