<!--
  - *Copyright (c) 2024. MosRat
  - All rights reserved.
  -
  - Project: fast-writer
  - File Name: Screenshot.vue
  - Author: MosRat (work@whl.moe)
  - Description:
  -->

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {invoke} from '@tauri-apps/api/core';
import {info, warn} from "@tauri-apps/plugin-log";
import {getCurrentWebviewWindow} from "@tauri-apps/api/webviewWindow";

info(">>>>>>>>>>>>>Vue setup>>>>>>>>>>>>")

const appWindow = getCurrentWebviewWindow()

const imgUrl = ref('');
const imgRef = ref<HTMLImageElement | null>(null);
const isMoved = ref(false);
const isDown = ref(false);
const mouseDownX = ref(0);
const mouseDownY = ref(0);
const mouseMoveX = ref(0);
const mouseMoveY = ref(0);
const screen = {
  width: window.innerWidth,
  height: window.innerHeight
};


onMounted(async () => {
  info(">>>>>>>>>>>>>Cmd Invoke!>>>>>>>>>>>>")

  await appWindow.listen<void>("activate", async () => {
    invoke<ArrayBuffer>('screenshot', {}).then(
        (uint8Array: ArrayBuffer) => {
          // 创建 Blob 对象
          const blob = new Blob([uint8Array], {type: 'image/png'});

          // 创建一个 URL 对象
          imgUrl.value = URL.createObjectURL(blob)

          info(`img received! ${imgUrl.value}`)

        }
    )

    try {
      await appWindow.once("success_save", async () => {
        await info("once success from rust!")
        await appWindow.hide();
      })

    } catch (error) {
      await warn(`Error in screenshot process:${error}`)
    }
  })


});

const onImageLoad = async () => {
  await info(`Success onImageLoad  ${imgUrl.value}`);
  if (imgUrl.value !== '' && (imgRef.value as HTMLImageElement).complete) {
    await appWindow.show();
    await appWindow.setFocus();
    await info!(">>>>>>>>>>>>>>>>>>>>>>>>>>Window show!>>>>>>>>>>>>>>>>>>>>>");

  }
};

const handleMouseDown = (e: MouseEvent) => {
  if (e.buttons === 1) {
    isDown.value = true;
    mouseDownX.value = e.clientX;
    mouseDownY.value = e.clientY;
  } else {
    appWindow.hide();
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (isDown.value) {
    isMoved.value = true;
    mouseMoveX.value = e.clientX;
    mouseMoveY.value = e.clientY;
  }
};

const handleMouseUp = async (e: MouseEvent) => {
  // await appWindow.hide();
  isDown.value = false;
  isMoved.value = false;

  const imgWidth = (imgRef.value as HTMLImageElement).naturalWidth;
  const dpi = imgWidth / screen.width;
  const left = Math.floor(Math.min(mouseDownX.value, e.clientX) * dpi);
  const top = Math.floor(Math.min(mouseDownY.value, e.clientY) * dpi);
  const right = Math.floor(Math.max(mouseDownX.value, e.clientX) * dpi);
  const bottom = Math.floor(Math.max(mouseDownY.value, e.clientY) * dpi);
  const width = right - left;
  const height = bottom - top;

  if (width <= 0 || height <= 0) {
    console.warn('Screenshot area is too small');
    await warn('Screenshot area is too small')
    await appWindow.close();
  } else {
    await info("emit success to rust!")
    await appWindow.emit('success', {left, top, width, height});
  }
};


</script>

<template>
  <img
      ref="imgRef"
      :style="{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      userSelect: 'none'
    }"
      :src="imgUrl"
      :draggable="false"
      alt="fail!"
      @load="onImageLoad"/>

  <div
      :class="{ 'selection-box': true, 'hidden': !isMoved }"
      :style="{
      top: `${Math.min(mouseDownY, mouseMoveY)}px`,
      left: `${Math.min(mouseDownX, mouseMoveX)}px`,
      bottom: `${screen.height - Math.max(mouseDownY, mouseMoveY)}px`,
      right: `${screen.width - Math.max(mouseDownX, mouseMoveX)}px`
    }"
  />
  <div
      class="overlay"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
  ></div>
</template>

<style scoped>
.selection-box {
  position: fixed;
  background-color: rgba(32, 128, 240, 0.125); /* #2080f020 with alpha */
  border: 1px solid #0ea5e9; /* Tailwind's sky-500 color */
}

.hidden {
  display: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: crosshair;
  user-select: none;
}
</style>