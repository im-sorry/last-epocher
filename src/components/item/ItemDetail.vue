<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useStore } from '@/utils/hooks';
import { isLegendaryItem, isAdvanceItem, isKey, isStatue, isRune } from '@/utils/item';
import AdvancedItemVue from './components/AdvancedItem.vue';
import KeyItemVue from './components/KeyItem.vue';
import LegendaryItemVue from './components/LegendaryItem.vue';
import NormalItemVue from './components/NormalItem.vue';
import StatueItemVue from './components/StatueItem.vue';
import RuneItemVue from './components/RuneItem.vue';
import { message } from 'ant-design-vue';

const store = useStore();
const currentItem = computed(() => store.state.currentItem);
const getKey = (type: string) => {
  return currentItem.value ? `${type}-${currentItem.value.inventoryPosition.x}-${currentItem.value.inventoryPosition.y}-${currentItem.value.data[3] || ''}` : '0'
}
const onApply = () => {
  store.commit('updateItem', unref(currentItem));
  message.success('同步成功');
}
</script>

<template>
  <div class="wrapper-item-detail">
    <span v-if="!Boolean(currentItem)" class="abs-center none-span">请先选择物品</span>
    <StatueItemVue v-else-if="isStatue(currentItem!)" :key="getKey('statue')" />
    <RuneItemVue v-else-if="isRune(currentItem!)" :key="getKey('Rune')" />
    <KeyItemVue v-else-if="isKey(currentItem!)" :key="getKey('key')" />
    <AdvancedItemVue v-else-if="isAdvanceItem(currentItem!)" :key="getKey('Advanced')" />
    <LegendaryItemVue v-else-if="isLegendaryItem(currentItem!)" :key="getKey('Legendary')" />
    <NormalItemVue v-else :key="getKey('Normal')" />
    <a-button type="primary" class="submit" @click="onApply" v-if="Boolean(currentItem)">同步到仓库</a-button>
  </div>
</template>

<style scoped lang="less">
.wrapper-item-detail {
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding-right: 6px;

  .none-span {
    height: 20px;
  }

  .submit {
    margin-top: 50px;
  }
}
</style>
