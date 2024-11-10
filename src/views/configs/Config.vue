<!--
  - *Copyright (c) 2024. MosRat
  - All rights reserved.
  -
  - Project: fast-writer
  - File Name: Config.vue
  - Author: MosRat (work@whl.moe)
  - Description:
  -->

<script setup lang="ts">
import {ref} from "vue";

const configs = ref<{ path: string, title: string }[]>([
  {path: "/config/general", title: "常规设置"}
])
</script>

<template>
  <div class="main-container">
    <div class="menu">
      <template v-for="({path}, idx) in configs" :key="idx">
        <router-link :to="path">{{ idx }}</router-link>
      </template>
    </div>
    <div class="configs">
        <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px; /* 圆角 */
  padding: 1vh 1vw;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  width: 100%; /* 宽度减去左右内边距 */
  height: 100%; /* 高度减去上下内边距 */
  margin: 5px auto; /* 居中 */
  box-sizing: border-box;
}

.menu{
  position: relative;
  display: flex;
  width: 20vw;
  height: 100%;
}

.configs{
  margin-left: 20vw;
  padding: 20px;
}
</style>