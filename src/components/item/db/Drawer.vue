<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/utils/hooks';
import KeyVue from './Key.vue';

const store = useStore();
const showDrawer = computed(() => store.state.showItemDBModal)
const onCancel = () => {
  store.commit('setShowItemDBModal', false);
}
const selectedKey = ref('key');
</script>

<template>
  <a-drawer wrapClassName="db-modal" :footer="null" :visible="showDrawer" @close="onCancel" width="260px"
    :mask-closable="false" :mask="false">
    <template #title>
      <div class="flex-between">
        <span>物品数据库</span>
        <a-select size="small" style="width:70px;margin-right:20px" v-model:value="selectedKey">
          <a-select-option value="key">钥匙</a-select-option>
        </a-select>
      </div>
    </template>
    <KeyVue v-if="selectedKey === 'key'" />
  </a-drawer>
</template>

<style lang="less">
.db-modal {
  .ant-drawer-content {
    background-color: black;

    .ant-drawer-header {
      background-color: black;

      .ant-drawer-title,
      .ant-drawer-close {
        color: var(--base-color)
      }
    }
  }
}
</style>
<style scoped>
a {
  color: #42b983;
}
</style>
