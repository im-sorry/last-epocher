<script setup lang="ts">
import { InboxOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/utils/hooks';

import { decodeFile } from '@/utils/archive';

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const { onChange } = defineProps<{
  onChange?: (success: boolean) => void;
}>();

const store = useStore();

const handleChange = (info: FileInfo) => {
  Promise.all(info.fileList.map((file: any) => new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
      if (!ev.target) {
        resolve('');
        return;
      };
      if (ev.target.result) {
        resolve(decodeFile(ev.target.result as string));
      }
    }
    fileReader.readAsText(new Blob([file.originFileObj]));
  }))).then(persons => {
    store.commit('setPersons', persons.filter(Boolean))
    onChange && onChange(true);
  }).catch(() => {
    onChange && onChange(false);
  });
};
</script>

<template>
  <div class="wrapper">
    <a-upload-dragger :before-upload="() => false" name="file" :multiple="true" @change="handleChange" class="upload">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text base-color">点击选择文件或拖拽角色文件到这里</p>
      <p class="ant-upload-hint base-color">支持解析单个文件或者多个文件</p>
    </a-upload-dragger>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--base-color);
}

.upload {
  width: 60%;
  height: 30%;
  display: block;
}
</style>
<style lang="less">
.upload {
  .ant-upload-drag {
    background-color: transparent;
    border-color: #736dd5;
  }
}
</style>
