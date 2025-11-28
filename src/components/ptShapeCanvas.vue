<script setup lang="ts">
import type { DotParas, PtShapeParas } from '@/types/paras';
import { PtShape } from '@/types/paras';
import type { CirclesParas, CirclesPtsParas, SpiralParas } from '@/types/paras';
import { computed, onMounted, ref, watch } from 'vue';

const ptsNum = 4

const props = defineProps<{ dotParas: DotParas, ptShapeParas: PtShapeParas }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

const pts = computed(() => {
    let ptsCur: number[][] = []
    for (let i = 0; i < ptsNum; i++) {
        for (let j = 0; j < ptsNum; j++) {
            if (canvasRef.value) {
                let xCur = canvasRef.value.width / ptsNum * (i + 0.5 + Math.random() * props.dotParas.kOffset)
                let yCur = canvasRef.value.width / ptsNum * (j + 0.5 + Math.random() * props.dotParas.kOffset)
                ptsCur.push([xCur, yCur])
            }
        }
    }
    return ptsCur
})

function drawCanvas() {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let pt of pts.value) {
        if (pt[0] && pt[1]) {
            let xCur = pt[0]
            let yCur = pt[1]
            let rMax = canvas.width / ptsNum / props.dotParas.dPt * props.dotParas.rPt
            switch (props.ptShapeParas.shape) {
                case PtShape.Circles:
                    for (let i = 0; i < props.ptShapeParas.cirNum; i++) {
                        let rCur = 0
                        if (props.ptShapeParas.kMin == undefined || props.ptShapeParas.kMin === 0) {
                            rCur = rMax / props.ptShapeParas.cirNum * (i + 1)
                        }
                        else {
                            rCur = rMax * props.ptShapeParas.kMin +
                                rMax * (1 - props.ptShapeParas.kMin) / props.ptShapeParas.cirNum * (i + 1)
                        }
                        ctx.beginPath()
                        ctx.arc(xCur, yCur, rCur, 0, Math.PI * 2)
                        ctx.stroke()
                        ctx.closePath()
                    }
                    break
                case PtShape.CirclesPts:
                    for (let i = 0; i < props.ptShapeParas.cirNum; i++) {
                        let rCur = 0
                        if (props.ptShapeParas.kMin == undefined || props.ptShapeParas.kMin === 0) {
                            rCur = rMax / props.ptShapeParas.cirNum * (i + 1)
                        }
                        else {
                            rCur = rMax * props.ptShapeParas.kMin +
                                rMax * (1 - props.ptShapeParas.kMin) / props.ptShapeParas.cirNum * (i + 1)
                        }
                        let numCur = props.ptShapeParas.ptsNum
                        if (!props.ptShapeParas.isEqualAngle)
                            numCur = props.ptShapeParas.ptsNum * rCur / rMax
                        let dT = Math.PI * 2 / numCur
                        for (let j = 0; j < numCur; j++) {
                            let xCur2 = xCur + rCur * Math.cos(dT * j)
                            let yCur2 = yCur + rCur * Math.sin(dT * j)
                            ctx.beginPath()
                            ctx.arc(xCur2, yCur2, 2, 0, Math.PI * 2)
                            ctx.fill()
                            ctx.closePath()
                        }
                    }
                    break
                case PtShape.Spiral:
                    if (props.ptShapeParas.isEqualAngle) {
                        let dT = Math.PI * 2 * props.ptShapeParas.cirNum / (props.ptShapeParas.ptsNum - 1)
                        for (let i = 0; i < props.ptShapeParas.ptsNum; i++) {
                            let tCur = dT * i
                            let rCur = 0
                            if (props.ptShapeParas.kMin == undefined || props.ptShapeParas.kMin === 0) {
                                rCur = rMax / props.ptShapeParas.ptsNum * (i + 1)
                            }
                            else {
                                rCur = rMax * props.ptShapeParas.kMin +
                                    rMax * (1 - props.ptShapeParas.kMin) / props.ptShapeParas.ptsNum * (i + 1)
                            }
                            let xCur2 = xCur + rCur * Math.cos(tCur)
                            let yCur2 = yCur + rCur * Math.sin(tCur)
                            ctx.beginPath()
                            ctx.arc(xCur2, yCur2, 2, 0, Math.PI * 2)
                            ctx.fill()
                            ctx.closePath()
                        }
                    }
                    else {
                        let tMax = Math.PI * 2 * props.ptShapeParas.cirNum
                        let totalLength = tMax * tMax
                        for (let i = 0; i < props.ptShapeParas.ptsNum; i++) {
                            let tCur = Math.sqrt(totalLength * i / (props.ptShapeParas.ptsNum - 1))
                            let rCur = 0
                            if (props.ptShapeParas.kMin == undefined || props.ptShapeParas.kMin === 0) {
                                rCur = rMax / tMax * tCur
                            }
                            else {
                                rCur = rMax * props.ptShapeParas.kMin +
                                    rMax * (1 - props.ptShapeParas.kMin) / tMax * tCur
                            }
                            let xCur2 = xCur + rCur * Math.cos(tCur)
                            let yCur2 = yCur + rCur * Math.sin(tCur)
                            ctx.beginPath()
                            ctx.arc(xCur2, yCur2, 2, 0, Math.PI * 2)
                            ctx.fill()
                            ctx.closePath()
                        }
                    }
                    break
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
watch(props.ptShapeParas, drawCanvas, { deep: true })
</script>

<template>
    <canvas ref="canvasRef" width="400" height="400"></canvas>
</template>

<style scoped></style>