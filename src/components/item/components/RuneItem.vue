<script setup lang="ts">
import { computed } from 'vue'
import Title from './Title.vue';
import AffixList from '../../../../affix/data.json';

import { useStore } from '@/utils/hooks';

const store = useStore();
const currentItemData = computed(() => store.state.currentItem?.data!);
const onAffixChange = (val: string) => {
  const [main, sub] = val.split('-').map(Number);
  currentItemData.value[2] = main;
  currentItemData.value[3] = sub;
}
const getAffixKey = (affix: Affix_Item) => {
  return `${affix.main}-${affix.sub}`;
}
</script>

<template>
  <div class="wrapper-key-item">
    <Title />
    <div class="affix-item">
      <span>词缀: </span>
      <a-select showSearch :value="`${currentItemData[2]}-${currentItemData[3]}`" size="small" style="width:150px"
        optionFilterProp="content" @change="(val: string) => onAffixChange(val)">
        <a-select-option v-for="affix in AffixList" :key="getAffixKey(affix)" :value="getAffixKey(affix)"
          :content="`${affix.detail}${affix.subDetail}`">
          <a-tooltip placement="left">
            <template #title>{{ affix.detail }}</template> {{ affix.detail }}
          </a-tooltip>
          <div>{{ affix.subDetail }}</div>
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<style scoped>
.affix-item {
  margin-top: 20px;
}
</style>
