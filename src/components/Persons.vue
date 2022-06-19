<script setup lang="ts">
import ImportVue from './Import.vue';
import { PlusSquareOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getMasteryName } from '@/utils/character';
import { computed, ref } from 'vue'
import { useStore } from '@/utils/hooks';

const store = useStore();
const currentPersonIndex = computed(() => store.state.currentPersonIndex);
const persons = computed(() => store.state.persons);

const modalVisible = ref(false);
const masteryName = (person: Person) => {
  const { characterName, masteryName } = getMasteryName(person);
  return `${characterName}-${masteryName}`;
}

const onChangePerson = ({ key }: { key: number }) => {
  store.commit('setCurrentPersonIndex', key);
}
const onImportChange = (success: boolean) => {
  if (success) {
    message.success('添加成功');
  } else {
    message.error('添加失败');
  }
  modalVisible.value = false;
}
const onAdd = () => {
  modalVisible.value = true;
}

</script>

<template>
  <div class="person-list-title base-color flex-center">
    <span class="text">角色列表</span>
    <PlusSquareOutlined class="add-icon" @click="onAdd" />
  </div>
  <a-menu :selectedKeys="[currentPersonIndex]" mode="inline" theme="dark" @click="onChangePerson">
    <a-menu-item :key="index" v-for="(p, index) in persons" style="height:60px">
      <div class="character-name">{{ p.characterName }}</div> {{ masteryName(p) }}
    </a-menu-item>
  </a-menu>
  <a-modal v-model:visible="modalVisible" title="添加角色" :footer="null">
    <ImportVue :onChange="onImportChange" />
  </a-modal>
</template>

<style scoped lang="less">
.character-name {
  height: 25px;
}

.person-list-title {
  font-weight: bold;
  height: 40px;

  .text {
    margin-right: 20px;
    font-size: 20px;
  }

  .add-icon {
    cursor: pointer;

    &:hover {
      color: rgb(158, 158, 160);
    }
  }
}
</style>
