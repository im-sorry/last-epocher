<script setup lang="ts">
import { InboxOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/utils/hooks';

import { decodeFile } from '@/utils/archive';
import { message } from 'ant-design-vue';

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

const handleChange = (info: FileInfo, fileList: FileInfo[]) => {
  Promise.all(fileList.map((file: any) => new Promise<{ result: Person; name: string } | null>(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
      if (!ev.target) {
        resolve(null);
        return;
      };
      if (ev.target.result) {
        let result = null;
        try {
          result = decodeFile(ev.target.result as string);
        } catch (error) {
          message.error('解析人物文件失败')
          resolve(null);
          return;
        }
        resolve({
          result,
          name: file.name,
        });
      }
    }
    fileReader.readAsText(new Blob([file]));
  }))).then((persons) => {
    store.commit('addPerson', persons.filter(Boolean).map(item => item?.result));
    store.commit('addFileName', persons.filter(Boolean).map(item => item?.name));
    onChange && onChange(true);
  }).catch(() => {
    onChange && onChange(false);
  });
  return false;
};
</script>

<template>
  <div class="wrapper">
    <a-upload-dragger :before-upload="handleChange" name="file" class="upload">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text base-color">点击选择文件或拖拽角色文件到这里</p>
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
