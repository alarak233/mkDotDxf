<script setup lang="ts">
import type { DotParas } from '@/types/paras';
import { reactive, computed } from 'vue';

let dotParas = reactive<DotParas>({
    RMin: 5,
    RMax: 30,
    dPt: 0.4,
    rPt: 0.1,
    kOffset: 0.15
})

interface FieldConfig {
    label: string,
    min: number,
    max: number,
    step: number
}

const fieldConfigs: Record<keyof DotParas, FieldConfig> = {
    RMin: { label: "最小分布直径", min: 0, max: 50, step: 1 },
    RMax: { label: "最大分布直径", min: 0, max: 40, step: 1 },
    dPt: { label: "点间距", min: 0.25, max: 1, step: 0.05 },
    rPt: { label: "点大小", min: 0.1, max: 0.5, step: 0.01 },
    kOffset: { label: "随机分布系数", min: 0, max: 1, step: 0.01 },
}

defineExpose(dotParas)

</script>

<template>
    <div>
        <h3>点扩散参数设置</h3>
        <div v-for="(config, key) in fieldConfigs">
            <label :for="config.label">{{ config.label }}</label>
            <input type="number" v-model.number="dotParas[key]" :min="config.min" :max="config.max" />
            <input type="range" v-model.number="dotParas[key]" :min="config.min" :max="config.max"
                :step="config.step" />
        </div>
    </div>

</template>

<style scoped></style>