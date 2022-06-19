<script setup lang="ts">
const X = 14;
const Y = 8;
defineProps<{ hasItem: boolean }>();
</script>

<template>
  <div class="wrapper-grid">
    <slot></slot>
    <template v-if="!hasItem">
      <div v-for="x in X * Y" :key="x" class="item"></div>
    </template>
  </div>
</template>

<style scoped lang="less">
.wrapper-grid {
  width: 100%;
  height: 100%;
  background-color: rgba(222, 222, 222, .5);
  border: 1px solid rgba(222, 222, 222, .5);
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(14, 1fr);
  row-gap: 1px;
  column-gap: 1px;

  .item {
    background-color: rgb(37, 36, 36);
  }
}
</style>
