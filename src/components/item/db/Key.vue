<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/utils/hooks';
import { KEY_MAP } from '@/constants/item';
import { getKeyTemplate, findItemPosition } from '@/utils/item';
import ItemShowerVue from '../ItemShower.vue';
import { message } from 'ant-design-vue';

const store = useStore();
const matrix = computed(() => store.getters.matrix);
const person = computed<Person>(() => store.getters.person);
const keys = Object.entries(KEY_MAP);
const onAdd = (keyType: number) => {
  const position = findItemPosition(matrix.value, 1, 1);
  if (!position) {
    message.error('仓库中未找到位置');
    return;
  }
  const item = getKeyTemplate(keyType, position.x, position.y);
  person.value.savedItems.push(item);
}
</script>

<template>
  <div class="wrapper">
    <div class="key-item flex-between" v-for="item in keys" :key="item[0]">
      <div class="show-wrapper">
        <ItemShowerVue :item="getKeyTemplate(Number(item[0]))" :disable-click="true" />
      </div>
      <a-button type="primary" size="small" @click="() => onAdd(Number(item[0]))">添加</a-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  color: var(--base-color);

  .key-item+.key-item {
    border-top: 1px solid;
  }

  .key-item {
    height: 100px;

    .show-wrapper {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
