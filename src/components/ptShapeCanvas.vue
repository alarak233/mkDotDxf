<script setup lang="ts">
import type { DotParas, PtShapeParas } from '@/types/paras';
import { PtShape } from '@/types/paras';
import type { CirclesParas, CirclesPtsParas, SpiralParas } from '@/types/paras';
import { computed, onMounted, ref, watch } from 'vue';

const ptsNum = 4

const props = defineProps<{ dotParas: DotParas, ptShapeParas: PtShapeParas }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
function drawCanvas() {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < ptsNum; i++) {
        for (let j = 0; j < ptsNum; j++) {
            let xCur = canvas.width / ptsNum * (i + 0.5 + Math.random() * props.dotParas.kOffset)
            let yCur = canvas.width / ptsNum * (j + 0.5 + Math.random() * props.dotParas.kOffset)
            switch (props.ptShapeParas.shape) {
                case PtShape.Circles:
                    let rMax = canvas.width / ptsNum / props.dotParas.dPt * props.dotParas.rPt
                    for (let j = 0; j < props.ptShapeParas.cirNum; j++) {
                        let rCur = 0
                        if (props.ptShapeParas.kMin == undefined || props.ptShapeParas.kMin === 0) {
                            rCur = rMax / props.ptShapeParas.cirNum * (j + 1)
                        }
                        else {
                            rCur = (rMax)
                        }
                        ctx.beginPath()
                        ctx.arc(xCur, yCur, rCur, 0, Math.PI * 2)
                        ctx.stroke()
                        ctx.closePath()
                    }
                    break;
                default:
                    ctx.beginPath()
                    ctx.arc(xCur, yCur, 5, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.closePath()
            }
        }
    }
}

onMounted(() => drawCanvas())
watch(() => [
    props.dotParas.kOffset,
    props.dotParas.dPt,
    props.dotParas.rPt,
    props.ptShapeParas.shape,
], drawCanvas, { deep: true })
</script>

<template>
    <canvas ref="canvasRef" width="400" height="400"></canvas>
</template>

<style scoped></style>