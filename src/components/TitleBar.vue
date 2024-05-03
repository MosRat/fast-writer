<script setup lang="ts">
import {getCurrent} from '@tauri-apps/api/window'
import type {Theme} from '@tauri-apps/api/window'
import {onMounted, ref} from "vue";

const appWindow = getCurrent()
const darkMode = ref("light")
const isMaximized = ref(false)
const minMax = async () => {
  if (await appWindow.isMaximized()) {
    await appWindow.unmaximize()
    isMaximized.value = false
  } else {
    await appWindow.maximize()
    isMaximized.value = true
  }
}
onMounted(async () => {
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
    <div id="titlebar-minimize" class="titlebar-button" @click="appWindow.minimize()">
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
    <div id="titlebar-close" class="titlebar-button" @click="appWindow.close()">
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
  padding-left: 0.5vw;
  display: flex;
  align-items: center;
}

.titlebar-title {
  padding-left: 0.5vw;
}

.titlebar-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.titlebar-icon img {
  max-height: 65vh;

}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  min-width: 48px;
  height: 100vh;
}

.titlebar-button:hover {
  background: #888888;
}

#titlebar-close:hover {
  background: #fd4543;
}
</style>