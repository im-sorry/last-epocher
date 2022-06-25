<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Import from '@/components/Import.vue';
import Backup from '@/components/Backup.vue';
import Persons from '@/components/Persons.vue'
import Items from '@/components/item/Items.vue'
import ItemDetail from '@/components/item/ItemDetail.vue'
import { computed, onErrorCaptured, onMounted, ref } from 'vue';
import { useStore } from '@/utils/hooks';
import pkg from '../package.json';

import 'ant-design-vue/lib/message/style/index.css';

const store = useStore();
const hasImported = computed(() => Boolean(store.state.persons.length));
const hasError = ref(false);
const errorMsg = ref('');
const itemsDiv = ref(null);

onErrorCaptured((err) => {
  hasError.value = true;
  errorMsg.value = err.message;
  document.body.style.setProperty('background-color', 'white');
})
onMounted(() => {
  const versionDiv = document.getElementsByClassName('version-display')[0];
  versionDiv.textContent = versionDiv.textContent?.replace('{__LER_VERSION__}', pkg.version) || '';
})
</script>

<template>
  <Backup :msg="errorMsg" v-if="hasError" />
  <Import v-else-if="!hasImported" />
  <a-layout v-else style="height:100%;">
    <a-layout-sider>
      <Persons />
    </a-layout-sider>
    <a-layout-content>
      <Items ref="itemsDiv" />
    </a-layout-content>
    <a-layout-sider class="right-sider">
      <ItemDetail />
    </a-layout-sider>
  </a-layout>
</template>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  --base-color: #9bb3a6;
  background-color: #001529;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--base-color);
  height: 100%;
}

.right-sider {
  flex: 0 0 260px !important;
  min-width: 260px !important;
  width: 260px !important;
}

.base-color {
  color: var(--base-color) !important;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.abs-center {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.attribute-title {
  color: aliceblue;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
}
</style>
