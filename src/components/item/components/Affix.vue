<script setup lang="ts">
import { computed } from 'vue'
import AffixList from '../../../../affix/data.json';
import { useStore } from '@/utils/hooks';
import { isLegendaryItem, hasT7Affix } from '@/utils/item';
import { Modal } from 'ant-design-vue';
import SliderVue from '@/components/BaseComponents/Slider.vue';

const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const { startIndex, noTier = false } = defineProps<{ startIndex: number; noTier?: boolean }>();
const affixNum = computed(() => currentItem.value.data[startIndex] || 0);
const affixs = computed(() => {
  if (!affixNum.value) return [];
  const list = [];
  const data = currentItem.value.data;
  for (let i = startIndex + 1; i <= startIndex + affixNum.value * 3; i += 3) {
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
      currentItem.value.data[3] = affixNum.value <= 2 ? 2 : 3;
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
  for (let index = 0; index < affixNum.value; index++) {
    currentItem.value.data[startIndex + index * 3 + 3] = 255;
  }
}
const toTopAffixTier = () => {
  if (noTier) return;
  for (let index = 0; index < affixNum.value; index++) {
    const affixIndex = startIndex + index * 3 + 1;
    const affixBaseCode = currentItem.value.data[affixIndex] % 16;
    currentItem.value.data[affixIndex] = affixBaseCode + 96;
  }
  if (!isLegendaryItem(currentItem.value)) {
    if (hasT7Affix(startIndex, currentItem.value)) {
      currentItem.value.data[3] = 4;
    } else {
      currentItem.value.data[3] = affixNum.value <= 2 ? 2 : 3;
    }
  }
}
const toDeleteAllAffix = () => {
  Modal.confirm({
    title: '确定删除所有词缀?',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      currentItem.value.data[startIndex] = 0;
      currentItem.value.data.splice(startIndex + 1, affixNum.value * 3)
    }
  })
}
const onDeleteAffix = (index: number) => {
  currentItem.value.data[startIndex] -= 1;
  currentItem.value.data.splice(startIndex + index * 3 + 1, 3);
}
const onDddAffix = () => {
  currentItem.value.data[startIndex] += 1;
  currentItem.value.data.splice(startIndex + 1, 0, 96, 0, 255)
}
</script>

<template>
  <div class="wrapper-affix">
    <div class="attribute-title flex-between">
      <span>词缀属性</span>
      <div>
        <a-tooltip>
          <template #title>注意：添加过多词缀有可能导致装备需求等级超过100级</template>
          <a style="font-size:0.5em;margin-right: 10px;color:brown" @click="onDddAffix">添加词缀</a>
        </a-tooltip>
        <a-popover placement="left">
          <template #content>
            <a-button style="display:block;" @click="toTopAffixRool" size="small">拉满所有词缀roll值</a-button>
            <a-button style="display:block;margin-top:10px" @click="toTopAffixTier" v-if="!noTier" size="small">
              修改所有词缀到T7 </a-button>
            <a-button danger style="display:block;margin-top:10px" @click="toDeleteAllAffix" size="small"> 删除所有词缀
            </a-button>
          </template>
          <a style="font-size:0.5em;margin-right:10px;">快捷操作</a>
        </a-popover>
      </div>
    </div>
    <template v-if="Boolean(affixNum)">
      <div v-for="(item, index) in affixs" :key="index" class="affix-container">
        <div class="affix-item affix-info" v-if="!noTier">
          <span>词缀{{ index + 1 }}:</span>
          <a-button danger size="small" type="text" @click="() => onDeleteAffix(index)">删除</a-button>
        </div>
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
          <SliderVue class="slider" :max="255" :min="0" :value="item[2]"
            :onChange="(val: number) => onChange(index, val)" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.attribute-title {
  margin-bottom: 10px;
  padding: 0 10px;
}

.wrapper-affix {
  margin-top: 30px;
  box-sizing: border-box;
  border-bottom: 1px solid;

  .shortcut-button+.shortcut-button {
    margin-top: 10px;
  }

  .shortcut-button {
    display: block;
  }

  .affix-container {
    border: 1px solid;
    border-bottom-width: 0px;
    padding: 5px 23px 5px 15px;

    .affix-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }
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
