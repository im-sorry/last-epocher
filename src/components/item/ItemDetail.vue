<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useStore } from '@/utils/hooks';
import { isLegendaryItem, isAdvanceItem, isKey, isStatue, isRune, isItemInBody } from '@/utils/item';
import AdvancedItemVue from './components/AdvancedItem.vue';
import KeyItemVue from './components/KeyItem.vue';
import LegendaryItemVue from './components/LegendaryItem.vue';
import NormalItemVue from './components/NormalItem.vue';
import StatueItemVue from './components/StatueItem.vue';
import RuneItemVue from './components/RuneItem.vue';
import { message } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

const store = useStore();
const currentItem = computed(() => store.state.currentItem);
const itemInBody = computed(() => isItemInBody(currentItem.value));
const getKey = (type: string) => {
  return currentItem.value ? `${type}-${JSON.stringify(currentItem.value.data)}-${JSON.stringify(currentItem.value.inventoryPosition)}` : '0'
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
    <a-tooltip title="注意：如果修改后的装备等级或职业与人物不符，则会被游戏强行拖到人物背包里(亲测)。建议适当修改" v-if="itemInBody">
      <a-button danger type="primary" class="submit" @click="onApply" v-if="Boolean(currentItem)">同步到仓库 </a-button>
    </a-tooltip>
    <a-button v-else type="primary" class="submit" @click="onApply" v-if="Boolean(currentItem)">同步到仓库 </a-button>
  </div>
</template>

<style scoped lang="less">
.wrapper-item-detail {
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .none-span {
    height: 20px;
  }

  .submit {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
