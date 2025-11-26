import type { DotParas } from "@/types/paras";
export function mkPts(dotParas: DotParas | null | undefined): number[][] {
    let pts: number[][] = []

    if (!dotParas) return pts
    let dPtMin = Math.max(dotParas.dPt, 0.25)
    let ptsNum = Math.ceil(dotParas.RMax / dPtMin)
    for (let i = -ptsNum; i <= ptsNum; i++) {
        for (let j = -ptsNum; j <= ptsNum; j++) {
            let xCur = (i + Math.random() * dotParas.kOffset) * dPtMin
            let yCur = (j + Math.random() * dotParas.kOffset) * dPtMin
            let r2Cur = Math.pow(xCur, 2) + Math.pow(yCur, 2)
            if (r2Cur >= Math.pow(dotParas.RMin, 2) && r2Cur <= Math.pow(dotParas.RMax, 2))
                pts.push([xCur, yCur])
        }
    }

    return pts
}