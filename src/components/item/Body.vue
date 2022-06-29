<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useStore } from '@/utils/hooks';
import { BAG_TYPE } from '@/constants/character';
import { message } from 'ant-design-vue';
import { STATUE_BAG_HEIGHT } from '@/constants/character';
import BodyItemVue from './components/BodyItem.vue';
import ItemGridVue from './ItemGrid.vue';
import ItemShowerVue from './ItemShower.vue';

const store = useStore();
const bodyStatueItems = computed(() => store.state.persons[store.state.currentPersonIndex].savedItems.filter(item => {
  return item.containerID === BAG_TYPE.神像栏;
}));
const person = computed(() => store.state.persons[store.state.currentPersonIndex]);
const level = ref(person.value.level);
const name = ref(person.value.characterName);
const onSaveLevel = () => {
  if (name.value === '') {
    message.error('人物名称不能为空');
    return;
  }
  person.value.level = level.value;
  person.value.characterName = name.value;
}

const statueWrapper = ref<HTMLDivElement>();
const statueWrapperStyle = ref({});
const bodyItemDiv = ref<HTMLDivElement>();
const baseWidth = ref(0);
const computeStyle = ({ width, height }: { width?: number; height?: number }) => {
  return Object.assign({}, width ? { width: `${width * baseWidth.value}px` } : {}, height ? { height: `${height * baseWidth.value}px` } : {})
}
const getBodyItem = (type: BAG_TYPE) => {
  return store.state.persons[store.state.currentPersonIndex].savedItems.filter(item => {
    return item.containerID === type
  })[0];
}
const getKey = (type: BAG_TYPE) => {
  const item = store.state.persons[store.state.currentPersonIndex].savedItems.filter(item => {
    return item.containerID === type
  })[0];
  if (!item) return '';
  return JSON.stringify(item.data);
}
onMounted(() => {
  nextTick(() => {
    baseWidth.value = (bodyItemDiv.value?.offsetHeight || 0) / 10;
    if (!statueWrapper.value) return;
    const width = statueWrapper.value.offsetHeight;
    const height = statueWrapper.value.offsetWidth;
    if (width >= height) {
      statueWrapperStyle.value = {
        width: `${height}px`,
        height: `${height}px`
      }
    } else {
      statueWrapperStyle.value = {
        width: `${width}px`,
        height: `${width}px`
      }
    }
  });
});
// 60 58 44

</script>

<template>
  <div class="wrapper">
    <div class="person-info">
      <div class="info-list">
        <div class="item">
          <span class="title">名称</span>
          <a-input v-model:value="name" style="width:90px" size="small" />
        </div>
        <div class="item">
          <span class="title">等级</span>
          <a-input-number v-model:value="level" size="small" :max="100" :min="1" />
        </div>
      </div>
      <a-button @click="onSaveLevel" ghost type="primary">保存人物信息</a-button>
    </div>
    <div class="body-item flex-around" ref="bodyItemDiv">
      <div class="row row1 flex-center" :style="computeStyle({ height: 2 })">
        <div class="head" :style="computeStyle({ height: 2, width: 2 })">
          <BodyItemVue :key="getKey(BAG_TYPE.头盔)" :item="getBodyItem(BAG_TYPE.头盔)" />
        </div>
      </div>
      <div class="row row2 flex-around" :style="computeStyle({ height: 4 })">
        <div class="left-weapon" :style="computeStyle({ height: 4, width: 2 })">
          <BodyItemVue :key="getKey(BAG_TYPE.主武器)" :item="getBodyItem(BAG_TYPE.主武器)" />
        </div>
        <div class="dress" :style="computeStyle({ height: 4, width: 3 })">
          <BodyItemVue :key="getKey(BAG_TYPE.胸甲)" :item="getBodyItem(BAG_TYPE.胸甲)" />
        </div>
        <div class="right-weapon" :style="computeStyle({ height: 4, width: 2 })">
          <BodyItemVue :key="getKey(BAG_TYPE.副武器)" :item="getBodyItem(BAG_TYPE.副武器)" />
        </div>
      </div>
      <div class="row row3 flex-around" :style="computeStyle({ height: 1 })">
        <div class="left-ring" :style="computeStyle({ height: 1, width: 1 })">
          <BodyItemVue :key="getKey(BAG_TYPE.左戒指)" :item="getBodyItem(BAG_TYPE.左戒指)" />
        </div>
        <div class="belt" :style="computeStyle({ height: 1, width: 3 })">
          <BodyItemVue :key="getKey(BAG_TYPE.腰带)" :item="getBodyItem(BAG_TYPE.腰带)" />
        </div>
        <div class="right-ring" :style="computeStyle({ height: 1, width: 1 })">
          <BodyItemVue :key="getKey(BAG_TYPE.右戒指)" :item="getBodyItem(BAG_TYPE.右戒指)" />
        </div>
      </div>
      <div class="row row4 flex-around" :style="computeStyle({ height: 2 })">
        <div class="glove" :style="computeStyle({ height: 2, width: 2 })">
          <BodyItemVue :key="getKey(BAG_TYPE.手套)" :item="getBodyItem(BAG_TYPE.手套)" />
        </div>
        <div class="shoe" :style="computeStyle({ height: 2, width: 2 })">
          <BodyItemVue :key="getKey(BAG_TYPE.鞋子)" :item="getBodyItem(BAG_TYPE.鞋子)" />
        </div>
        <div class="relics" :style="computeStyle({ height: 2, width: 2 })">
          <BodyItemVue :key="getKey(BAG_TYPE.遗物)" :item="getBodyItem(BAG_TYPE.遗物)" />
        </div>
      </div>
    </div>
    <div class="body-statue flex-center" ref="statueWrapper">
      <div :style="statueWrapperStyle">
        <ItemGridVue :has-item="true" :X="5" :Y="5">
          <ItemShowerVue :height="STATUE_BAG_HEIGHT" v-for="(item, index) in bodyStatueItems"
            :key="`${JSON.stringify(item.data)}`" :item="item" />
        </ItemGridVue>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: stretch;
  background-color: black;
  width: 100%;

  .person-info {
    flex-basis: 200px;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .item+.item {
      margin-top: 10px;
    }

    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .title {
      margin-right: 20px;
    }
  }

  .body-item {
    flex-basis: 400px;
    flex-grow: 4;
    flex-direction: column;
    border-left: 2px solid rgb(60, 58, 44);
    border-right: 2px solid rgb(60, 58, 44);

    .row {
      width: 100%;
    }

    .row1 {
      height: 20%;

      .head {
        background-color: aqua;
      }
    }

    .row2 {
      height: 40%;

      &>div {
        background-color: bisque;
      }
    }

    .row3 {
      height: 10%;

      &>div {
        background-color: green;
      }
    }

    .row4 {
      height: 20%;

      &>div {
        background-color: red;
      }
    }
  }

  .body-statue {
    flex-basis: 300px;
    flex-grow: 3;
  }
}
</style>
