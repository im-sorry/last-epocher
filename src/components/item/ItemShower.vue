<script setup lang="ts">
import { getItemDetail, copyItem, isSameItemInBag } from '@/utils/item';
import { useStore } from '@/utils/hooks';
import { Modal } from 'ant-design-vue';
import { computed } from 'vue';

const store = useStore();
const person = computed(() => store.state.persons[store.state.currentPersonIndex]);
const currentItem = computed(() => store.state.currentItem);
const { item, height = 1, isInBag = false, disableClick = false } = defineProps<{
  item: Item;
  height?: number; isInBag?: boolean; disableClick?: boolean;
}>();
const {
  x,
  y,
  w,
  h,
  name,
  color,
  quality
} = getItemDetail(item);

const style = {
  'grid-column-start': x + 1,
  'grid-column-end': x + 1 + w,
  'grid-row-start': height - y + 1 - h,
  'grid-row-end': height - y + 1,
  'background': `radial-gradient(ellipse, rgb(30,30,30) 65%, ${color})`,
  color,
}

const onClick = () => {
  if (disableClick) return;
  store.commit('setCurrentItem', copyItem(item));
}
const onDelete = () => {
  Modal.confirm({
    title: '确定要删除这个物品吗？',
    onOk() {
      if (currentItem.value && isSameItemInBag(item, currentItem.value)) {
        store.commit('setCurrentItem', null);
      }
      const index = person.value.savedItems.findIndex(i => isSameItemInBag(item, i));
      person.value.savedItems.splice(index, 1);
    },
    okText: '确定',
    cancelText: '取消'
  })
}
</script>

<template>
  <div class="wrapper-item flex-center" :style="style" @click="onClick">
    <a class="delete-button" @click.stop="onDelete" v-if="isInBag">删除</a>
    <span style="font-size:0.5em">
      <span style="font-size:0.3em">{{ quality ? `(${quality})` : '' }}</span> {{ name }} </span>
  </div>
</template>

<style scoped lang="less">
.wrapper-item {
  background-color: black;
  cursor: pointer;
  position: relative;
  height: 100%;

  &:hover {
    .delete-button {
      display: block;
    }
  }

  .delete-button {
    display: none;
    position: absolute;
    top: 2px;
    right: 5px;
    font-size: .5em;
  }
}
</style>
