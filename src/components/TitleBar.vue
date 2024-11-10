<script setup lang="ts">
import {getCurrentWindow} from "@tauri-apps/api/window";
import type {Theme} from '@tauri-apps/api/window'
import {onMounted, ref} from "vue";
import {navigate_webview} from "@lib/webview.ts";

// import {attachConsole} from '@tauri-apps/plugin-log';
import {listen} from "@tauri-apps/api/event";


const appWindow = getCurrentWindow()
const darkMode = ref("light")
const isMaximized = ref(false)
const isOverleaf = ref(true)
const isLoading = ref(false)
const minMax = async () => {
  if (await appWindow.isMaximized()) {
    await appWindow.unmaximize()
    isMaximized.value = false
  } else {
    await appWindow.maximize()
    isMaximized.value = true
  }
}

const switchWebview = async () => {
  if (!isLoading.value){
    isLoading.value=true
    await navigate_webview('w2', isOverleaf.value ? 'https://typst.app/' : 'https://overleaf.whl.moe/project');
    isOverleaf.value = !isOverleaf.value
    const unlisten = await listen<void>("loaded", async () => {
      isLoading.value=false
      unlisten()
    })
  }
}
onMounted(async () => {
  // await attachConsole();
  darkMode.value = (await appWindow.theme()) as Theme
})

</script>

<template>
  <div class="titlebar">
    <div data-tauri-drag-region class="titlebar-text">
      <div class="titlebar-icon">
        <img src="/icon.png" alt="icon">
      </div>
      <div class="titlebar-title">
        <slot>
          Fast Writer
        </slot>
      </div>
    </div>
    <div
        id="titlebar-overleaf"
        :class="{
      'titlebar-button':true,
      'chosen-loader':isOverleaf
    }"
        @click="!isOverleaf && switchWebview()"
    >
      <img
          src="/overleaf.png"
          alt="overleaf"
      />
    </div>
    <div
        id="titlebar-typst" :class="{
      'titlebar-button':true,
      'chosen-loader':!isOverleaf
    }" @click="isOverleaf && switchWebview()">
      <img
          src="/typst.png"
          alt="typst"
      />
    </div>
    <div id="titlebar-minimize" class="titlebar-button" @click="appWindow.minimize">
      <img
          :src="`/${darkMode}-icon/fluent_minimize-16-regular.svg`"
          alt="minimize"
      />
    </div>
    <div id="titlebar-maximize" class="titlebar-button" @click="minMax">
      <img
          :src="isMaximized?`/${darkMode}-icon/fluent_window-multiple-16-regular.svg`:`/${darkMode}-icon/fluent_maximize-16-regular.svg`"
          alt="maximize"
      />
    </div>
    <div id="titlebar-close" class="titlebar-button" @click="appWindow.hide">
      <img :src="`/${darkMode}-icon/ant-design_close-outlined.svg`" alt="close"/>
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  height: 100vh;
  padding-top: 1vh;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

}

.titlebar-text {
  flex-grow: 1;
  padding-left: 1vw;
  display: flex;
  align-items: center;
}

.titlebar-title {
  padding-left: 0.5vw;
  font-size: 0.9rem;
}

.titlebar-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.titlebar-icon img {
  max-height: 20px;
}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  min-width: 48px;
  height: 95vh;
}

.titlebar-button:hover {
  background: rgba(136, 136, 136, 0.5);
}

.chosen-loader {
  background: rgba(136, 136, 136, 0.2);
  border-radius: 4px;
  border: 1px solid rgba(194, 194, 194, 0.25);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 水平偏移量 | 垂直偏移量 | 模糊半径 | 阴影颜色 */
}

#titlebar-close:hover {
  background: #fd4543;
}

#titlebar-overleaf, #titlebar-typst {
  display: flex;
  justify-content: center;
}

#titlebar-overleaf img, #titlebar-typst img {
  max-width: 1.5vw;
}
</style>