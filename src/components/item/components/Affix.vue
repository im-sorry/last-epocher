<script setup lang="ts">
import { computed } from 'vue'
import AffixList from '../../../../affix/data.json';
import { useStore } from '@/utils/hooks';
import { isLegendaryItem, hasT7Affix } from '@/utils/item';

const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const { startIndex, noTier = false } = defineProps<{ startIndex: number; noTier?: boolean }>();
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
  if (noTier) return;
  currentItem.value.data[startIndex + index * 3 + 1] = value;
  if (!isLegendaryItem(currentItem.value)) {
    if (hasT7Affix(startIndex, currentItem.value)) {
      currentItem.value.data[3] = 4;
    } else {
      currentItem.value.data[3] = affixNum <= 2 ? 2 : 3;
    }
  }
}
const getAffixKey = (affix: Affix_Item) => {
  return `${affix.main}-${affix.sub}`;
}

const onAffixChange = (index: number, val: string, tier: number) => {
  const vals = val.split('-').map(Number);
  currentItem.value.data[startIndex + index * 3 + 1] = noTier ? 0 : tier + vals[0];
  currentItem.value.data[startIndex + index * 3 + 2] = vals[1];
}
const toTopAffixRool = () => {
  for (let index = 0; index < affixNum; index++) {
    currentItem.value.data[startIndex + index * 3 + 3] = 255;
  }
}
const toTopAffixTier = () => {
  if (noTier) return;
  for (let index = 0; index < affixNum; index++) {
    const affixIndex = startIndex + index * 3 + 1;
    const affixBaseCode = currentItem.value.data[affixIndex] % 16;
    currentItem.value.data[affixIndex] = affixBaseCode + 96;
  }
  if (!isLegendaryItem(currentItem.value)) {
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
    <div class="attribute-title flex-between"> 词缀属性 <a-popover placement="left">
        <template #content>
          <div>
            <a-button @click="toTopAffixRool" type="primary">拉满所有词缀roll值</a-button>
          </div>
          <a-button style="margin-top:20px" @click="toTopAffixTier" v-if="!noTier" type="primary">修改所有词缀到T7</a-button>
        </template>
        <a-button type="link">快捷操作</a-button>
      </a-popover>
    </div>
    <template v-for="(item, index) in affixs" :key="index">
      <div class="affix-item affix-level" v-if="!noTier">
        <span>词缀等级:</span>
        <a-select :value="Math.floor(item[0] / 16) * 16" size="small"
          @change="(val: number) => onTierChange(index, val + item[0] % 16)">
          <a-select-option v-for="item in 7" :value="(item - 1) * 16">T{{ item }}</a-select-option>
        </a-select>
      </div>
      <!-- <div class="affix-item"><span>词缀代码:</span> <span>{{ item[0] % 16 }}-{{ item[1] }}</span></div> -->
      <div class="affix-item">
        <span>词缀:</span>
        <a-select showSearch :value="`${item[0] % 16}-${item[1]}`" size="small" style="width:150px"
          optionFilterProp="content"
          @change="(val: string) => onAffixChange(index, val, Math.floor(item[0] / 16) * 16)">
          <a-select-option v-for="affix in AffixList" :key="getAffixKey(affix)" :value="getAffixKey(affix)"
            :content="`${affix.detail}${affix.subDetail}`">
            <a-tooltip placement="left">
              <template #title>{{ affix.detail }}</template> {{ affix.detail }}
            </a-tooltip>
            <div>{{ affix.subDetail }}</div>
          </a-select-option>
        </a-select>
      </div>
      <div class="affix-item affix-roll"><span>词缀roll值:</span>
        <a-slider class="slider" :max="255" :min="0" :value="item[2]" @change="(val: number) => onChange(index, val)" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.attribute-title {
  margin-bottom: 10px;
}

.wrapper-affix {
  padding: 0 10px;
  margin-top: 30px;
  box-sizing: border-box;

  .affix-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
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
