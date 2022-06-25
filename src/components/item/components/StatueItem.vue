<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import Title from './Title.vue';
import AffixVue from './Affix.vue';
import { CHARACTER_MAP, MASTERY_MAP } from '@/constants/character';
import { useStore } from '@/utils/hooks';
import { InfoCircleOutlined } from '@ant-design/icons-vue'

const CHARACTER_LIST = Object.entries(CHARACTER_MAP)
const store = useStore();
const currentItem = computed(() => store.state.currentItem!);
const character = computed(() => currentItem.value!.data[2]);
const mastery = computed(() => currentItem.value!.data[3]);
const masteryList = computed(() => {
  return Object.entries((MASTERY_MAP as any)[character.value]);
})
const onCharacterChange = (value: number) => {
  currentItem.value.data[2] = value;
  currentItem.value.data[3] = 1;
}
const onMasteryChange = (value: number) => {
  currentItem.value.data[3] = value;
}
</script>

<template>
  <div class="wrapper-statue-item">
    <Title />
    <div class="character_select">
      <div class="attribute-title">适用角色 <a-tooltip title="注意：不合适的角色和词缀搭配，有可能导致神像不可用。">
          <InfoCircleOutlined style="color: yellow" />
        </a-tooltip>
      </div>
      <div class="selectors">
        <a-select class="selector" :value="character" @change="onCharacterChange">
          <a-select-option v-for="item in CHARACTER_LIST" :key="item[0]" :value="Number(item[0])">{{ item[1] }}
          </a-select-option>
        </a-select>
        <a-select class="selector" :value="mastery" @change="onMasteryChange">
          <a-select-option v-for="item in masteryList" :key="item[0]" :value="Number(item[0])">{{ item[1] }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <AffixVue :start-index="8" :no-tier="true" />
  </div>
</template>

<style scoped lang="less">
.character_select {
  width: 100%;
  margin-top: 30px;
  padding: 0 5px;

  .selectors {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .selector {
    width: 45%;
  }
}
</style>
