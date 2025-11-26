<script setup lang="ts">
import Paras from './components/paras.vue';
import { ref, computed } from 'vue';
import type { DotParas } from './types/paras';
import ConvasRender from './components/canvasRender.vue';
import { mkPts } from './utils/mkPts';

const dotParas = ref<DotParas | null>(null)
const ptPos = computed(() => mkPts(dotParas.value))

</script>

<template>
  <div class="app">
    <h1>点扩散文件生成工具</h1>
    <div class="container">
      <ConvasRender v-if="dotParas" :pts="ptPos" :dot-paras="dotParas"></ConvasRender>
      <ConvasRender v-if="dotParas" :pts="ptPos" :dot-paras="dotParas" :-r-max="5" :x-offset="4"></ConvasRender>
      <Paras ref="dotParas" />
      <label>
        {{ ptPos.length }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  place-items: center;
}

.container {
  display: flex;
}
</style>
