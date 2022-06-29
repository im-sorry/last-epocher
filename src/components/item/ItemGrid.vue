<script setup lang="ts">
const { hasItem, X, Y, borders = [] } = defineProps<{ hasItem: boolean; X: number; Y: number; borders?: string[] }>();
const style = borders.reduce((prev, cur) => {
  prev[`border-${cur}`] = '1px solid rgba(222, 222, 222, .5)';
  return prev;
}, {
  'grid-template-rows': `repeat(${Y}, 1fr)`,
  'grid-template-columns': `repeat(${X}, 1fr)`
} as any);
</script>

<template>
  <div class="wrapper-grid" :style="style">
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
  display: grid;
  row-gap: 1px;
  column-gap: 1px;

  .item {
    background-color: rgb(37, 36, 36);
  }
}
</style>
