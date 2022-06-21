<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from '@/utils/hooks';
import { isAdvanceItem, hasT7Affix } from '@/utils/item';

const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const { startIndex } = defineProps<{ startIndex: number }>();
const affixNum = currentItem.value.data[startIndex] || 0;
const affixs = computed(() => {
  const list = [];
  const data = currentItem.value.data;
  for (let i = startIndex + 1; i <= startIndex + affixNum * 3; i += 3) {
    list.push([data[i], data[i + 1], data[i + 2]]);
  }
  return list;
});
const onChange = (index: number, value: number) => {
  currentItem.value.data[startIndex + index * 3 + 3] = value;
}
const onTierChange = (index: number, value: number) => {
  currentItem.value.data[startIndex + index * 3 + 1] = value;
  if (!isAdvanceItem(currentItem.value)) {
    console.log(hasT7Affix(startIndex, currentItem.value), 'hasT7Affix(startIndex, currentItem.value)')
    if (hasT7Affix(startIndex, currentItem.value)) {
      currentItem.value.data[3] = 4;
    } else {
      currentItem.value.data[3] = affixNum <= 2 ? 2 : 3;
    }
  }
}
</script>

<template>
  <div class="wrapper-affix">
    <div class="attribute-title">词缀属性</div>
    <template v-for="(item, index) in affixs" :key="index">
      <div class="affix-item affix-level">
        <span>词缀等级:</span>
        <a-select :value="Math.floor(item[0] / 16) * 16" size="small"
          @change="(val: number) => onTierChange(index, val + item[0] % 16)">
          <a-select-option v-for="item in 7" :value="(item - 1) * 16">T{{ item }}</a-select-option>
        </a-select>
      </div>
      <div class="affix-item"><span>词缀代码:</span> <span>{{ item[0] % 16 }}-{{ item[1] }}</span></div>
      <div class="affix-item affix-roll"><span>词缀roll值:</span>
        <a-slider class="slider" :max="255" :min="0" :value="item[2]" @change="(val: number) => onChange(index, val)" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.wrapper-affix {
  padding: 0 10px;
  margin-top: 30px;
  box-sizing: border-box;

  .affix-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .affix-roll {
    margin-bottom: 10px;
  }

  .slider {
    padding-top: 0;
    margin-top: 0;
    width: 150px;
    height: 0;
    margin: 0;
    padding: 0;
  }
}
</style>
