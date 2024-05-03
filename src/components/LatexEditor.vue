<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import katex from 'katex';

const latex = ref('');
const rendered = ref('');

watchEffect(() => {
  try {
    rendered.value = latex.value ? katex.renderToString(latex.value, { throwOnError: false }) : '';
  } catch (error) {
    console.error('LaTeX 渲染错误:', error);
    rendered.value = '';
  }
});
</script>

<template>
  <div class="latex-editor">
    <input v-model="latex" placeholder="输入 LaTeX 公式" class="latex-input">
    <div v-html="rendered" class="latex-preview"></div>
  </div>
</template>

<style scoped>
.latex-editor {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  max-height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.latex-input {
  width: 100%;
  padding-block: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px auto;
}

.latex-preview {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>