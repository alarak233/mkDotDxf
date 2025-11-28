<script setup lang="ts">
import DotParasV from './components/dotParasV.vue';
import { ref, computed } from 'vue';
import type { DotParas } from './types/paras';
import DotCanvas from './components/dotCanvas.vue';
import { mkPts } from './utils/mkPts';
import PtShapeParasV from './components/ptShapeParasV.vue';
import type { PtShapeParas } from './types/paras';
import PtShapeCanvas from './components/ptShapeCanvas.vue';

const dotParas = ref<DotParas | null>(null)
const ptPos = computed(() => mkPts(dotParas.value))
const ptShapeParas = ref<PtShapeParas | null>(null)

</script>

<template>
  <div class="app">
    <h1>点扩散文件生成工具</h1>
    <div class="container">
      <DotCanvas v-if="dotParas" :pts="ptPos" :dot-paras="dotParas"></DotCanvas>
      <DotCanvas v-if="dotParas" :pts="ptPos" :dot-paras="dotParas" :-r-max="5" :x-offset="4">
      </DotCanvas>
      <div>
        <DotParasV ref="dotParas" />
        <label>
          点数量:{{ ptPos.length }}
        </label>
      </div>
    </div>
    <div class="container">
      <PtShapeCanvas v-if="dotParas && ptShapeParas" :dot-paras="dotParas" :pt-shape-paras="ptShapeParas">
      </PtShapeCanvas>
      <PtShapeParasV ref="ptShapeParas"></PtShapeParasV>
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
  flex-wrap: wrap;
}
</style>
