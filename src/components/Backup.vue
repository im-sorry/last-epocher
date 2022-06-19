<script setup lang="ts">
defineProps<{ msg: string }>();
const onReload = () => {
  location.reload();
}
</script>

<template>
  <a-result status="error" title="出错啦！刷新重试一下吧" :sub-title="msg">
    <template #extra>
      <a-button type="primary" @click="onReload">刷新页面</a-button>
    </template>
  </a-result>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
