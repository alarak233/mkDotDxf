<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { DotParas } from '@/types/paras';

interface Props {
    pts: number[][],
    dotParas: DotParas,
    RMax?: number,
    xOffset?: number
}
const props = withDefaults(defineProps<Props>(), { pts: () => [], dotParas: () => ({ RMin: 5, RMax: 30, dPt: 0.2, rPt: 0.1, kOffset: 0.15 }), RMax: 40, xOffset: 0 })
const canvasRef = ref<HTMLCanvasElement | null>(null)

function pt2canvas(x: number, mid: number, k: number): number {
    return x * k + mid
}

function drawCanvas() {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let kEx = canvas.height / 2 / props.RMax
    for (const pt of props.pts) {
        if (pt.length > 1) {
            let xCan = pt2canvas(pt[0]! + props.xOffset, canvas.width / 2, kEx)
            let yCan = pt2canvas(pt[1]!, canvas.height / 2, kEx)
            let rCan = pt2canvas(props.dotParas.rPt!, 0, kEx)
            if (xCan > 0 && xCan < canvas.width && yCan > 0 && yCan < canvas.height) {
                ctx.beginPath()
                ctx.arc(xCan, yCan, rCan, 0, Math.PI * 2)
                ctx.fill()
            }
        }
    }
}

onMounted(() => drawCanvas())
watch(() => [props.pts, props.dotParas.rPt], drawCanvas, { deep: true })
</script>

<template>
    <canvas ref="canvasRef" width="800" height="600"></canvas>
</template>

<style scoped></style>