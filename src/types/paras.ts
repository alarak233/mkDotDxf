interface DotParas {
    RMin: number,
    RMax: number,
    dPt: number,
    rPt: number,
    kOffset: number
}

enum PtShape {
    SinglePoint,
    Circles,
    CirclesPts,
    Spiral
}

// 基础接口
interface BaseShapeParas {
    shape: PtShape;
}

// 各个形状的具体参数
interface SinglePointParas extends BaseShapeParas {
    shape: PtShape.SinglePoint;
    // 单点模式不需要额外参数
}

interface CirclesParas extends BaseShapeParas {
    shape: PtShape.Circles;
    cirNum: number;
    kMin?: number;
}

interface CirclesPtsParas extends BaseShapeParas {
    shape: PtShape.CirclesPts;
    cirNum: number;
    ptsNum: number;
    isEqualAngle: boolean;
    kMin?: number;
}

interface SpiralParas extends BaseShapeParas {
    shape: PtShape.Spiral;
    cirNum: number;
    ptsNum: number;
    isEqualAngle: boolean;
    kMin?: number;
}

// 联合类型
type PtShapeParas = SinglePointParas | CirclesParas | CirclesPtsParas | SpiralParas;

interface FieldConfig {
    label: string,
    min?: number,
    max?: number,
    step?: number,
    value?: object
}

// 导出所有类型
export { PtShape }
export type {
    DotParas,
    PtShapeParas,
    SinglePointParas,
    CirclesParas,
    CirclesPtsParas,
    SpiralParas,
    FieldConfig
};