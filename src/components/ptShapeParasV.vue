<script setup lang="ts">
import { PtShape, } from '@/types/paras';
import type { PtShapeParas, FieldConfig, SinglePointParas, CirclesParas, CirclesPtsParas, SpiralParas } from '@/types/paras';
import { reactive } from 'vue';

const ptShapeParas = reactive<PtShapeParas>({ shape: PtShape.SinglePoint })

const singlePointParas = reactive<SinglePointParas>({ shape: PtShape.SinglePoint })
const circlesParas = reactive<CirclesParas>({
    shape: PtShape.Circles,
    cirNum: 2,
    kMin: 0
})
const circlesPtsParas = reactive<CirclesPtsParas>({
    shape: PtShape.CirclesPts,
    cirNum: 2,
    ptsNum: 10,
    isEqualAngle: false,
    kMin: 0,
})
const spiralParas = reactive<SpiralParas>({
    shape: PtShape.Spiral,
    cirNum: 3,
    ptsNum: 27,
    isEqualAngle: false,
    kMin: 0,
})


const circlesConfig: Record<keyof CirclesParas, FieldConfig> = {
    shape: { label: "" },
    cirNum: { label: "圈数", min: 1, max: 5, step: 1 },
    kMin: { label: "最小圈比例", min: 0, max: 1, step: 0.1 }
}
const circlesPtsConfig: Record<keyof CirclesPtsParas, FieldConfig> = {
    shape: { label: "" },
    cirNum: { label: "圈数", min: 1, max: 5, step: 1 },
    ptsNum: { label: "最外圈点数量", min: 1, max: 10, step: 1 },
    isEqualAngle: { label: "" },
    kMin: { label: "最小圈比例", min: 0, max: 1, step: 0.1 },
}
const spiralConifg: Record<keyof SpiralParas, FieldConfig> = {
    shape: { label: "" },
    cirNum: { label: "圈数", min: 1, max: 5, step: 1 },
    ptsNum: { label: "最外圈点数量", min: 1, max: 10, step: 1 },
    isEqualAngle: { label: "" },
    kMin: { label: "最小圈比例", min: 0, max: 1, step: 0.1 },
}

const radioConifg: Record<PtShape, FieldConfig> = {
    [PtShape.SinglePoint]: { label: "单点", value: singlePointParas },
    [PtShape.Circles]: { label: "多圈圆", value: circlesParas },
    [PtShape.CirclesPts]: { label: "点构成的多圈圆", value: circlesPtsParas },
    [PtShape.Spiral]: { label: "点构成的多圈螺旋线", value: spiralParas },
}

function selectionShape(shape: PtShape) {
    Object.assign(ptShapeParas, radioConifg[shape].value)
}

defineExpose(ptShapeParas)
</script>

<template>
    <div>
        <h3>dot形状控制</h3>
        <div v-for="(config, key) in radioConifg">
            <input type="radio" :checked="ptShapeParas.shape == key" :value="key" @change="selectionShape(key)" />
            <label>{{ config.label }}</label>
        </div>
        <div v-if="ptShapeParas.shape == PtShape.Circles">
            <div v-for="(config, key) in circlesConfig">
                <div v-if="key !== 'shape'">
                    <label :for="config.label">{{ config.label }}</label>
                    <input type="number" v-model.number="circlesParas[key]" :min="config.min" :max="config.max" />
                    <input type="range" v-model.number="circlesParas[key]" :min="config.min" :max="config.max"
                        :step="config.step" />
                </div>
            </div>
        </div>
        <div v-if="ptShapeParas.shape == PtShape.CirclesPts">
            <div v-for="(config, key) in circlesPtsConfig">
                <div v-if="key !== 'shape' && key !== 'isEqualAngle'">
                    <label :for="config.label">{{ config.label }}</label>
                    <input type="number" v-model.number="circlesPtsParas[key]" :min="config.min" :max="config.max" />
                    <input type="range" v-model.number="circlesPtsParas[key]" :min="config.min" :max="config.max"
                        :step="config.step" />
                </div>
            </div>
            <input type="radio" v-model="circlesPtsParas.isEqualAngle" :value="true" />
            <label>等角度分布</label>
            <input type="radio" v-model="circlesPtsParas.isEqualAngle" :value="false" />
            <label>等弧长分布</label>
        </div>
        <div v-if="ptShapeParas.shape == PtShape.Spiral">
            <div v-for="(config, key) in spiralConifg">
                <div v-if="key !== 'shape' && key !== 'isEqualAngle'">
                    <label :for="config.label">{{ config.label }}</label>
                    <input type="number" v-model.number="spiralParas[key]" :min="config.min" :max="config.max" />
                    <input type="range" v-model.number="spiralParas[key]" :min="config.min" :max="config.max"
                        :step="config.step" />
                </div>
            </div>
            <input type="radio" v-model="spiralParas.isEqualAngle" :value="true" />
            <label>等角度分布</label>
            <input type="radio" v-model="spiralParas.isEqualAngle" :value="false" />
            <label>等弧长分布</label>
        </div>
        <label>{{ ptShapeParas }}</label>
    </div>
</template>

<style scoped></style>