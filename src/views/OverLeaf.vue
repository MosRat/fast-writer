<script setup lang="ts">
import LatexEditor from "@cp/LatexEditor.vue";
// import {getCurrent, LogicalSize} from '@tauri-apps/api/window';
// import {Webview} from '@tauri-apps/api/webview';
//
// const appWindow = getCurrent()
// // await appWindow.setSize(new LogicalSize(800, 600))
// const webview = new Webview(appWindow, 'overleaf', {
//   height: 300,
//   width: 400,
//   x: 100,
//   y: 100,
//   url: 'https://www.overleaf.com/project'
// })
//
// // webview.
// webview.once('tauri://created', function () {
//   // webview successfully created
// });
// webview.once('tauri://error', function (e) {
//   // an error happened creating the webview
//   console.error(e)
// });

</script>

<template>
  <div>
    <LatexEditor>

    </LatexEditor>
    <iframe src="https://chat.openai.com/">

    </iframe>
  </div>

</template>

<style scoped>
div {
  box-sizing: border-box;
  height: 90vh;
  border: 1px solid transparent;
  border-radius: 2px;
  background:transparent;
  padding: 2px;
  margin: 8px;
}

</style>