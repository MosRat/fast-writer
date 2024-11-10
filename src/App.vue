<script setup lang="ts">
import {getCurrentWebview} from "@tauri-apps/api/webview";
import {useRouter} from "vue-router";

const router =useRouter()

const webview = getCurrentWebview()
router.replace({
  path:`/${webview.label}`
})



</script>

<template>
  <div class="main-container">
    <router-view/>
  </div>
</template>

<style scoped>
.main-container {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
}

</style>
