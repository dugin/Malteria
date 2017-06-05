import { ColorModel } from "./color-model";
import { GlassModel } from "./glass-model";


export class BeerStyleModel {


    constructor(
        public style: string,
        public category: string,
        public description: string,
        public numberBJCP: number,
        public numberStyle: number,
        public color_range: ColorModel[],
        public glass: GlassModel,
        public temperature_range: number[],
        public SRM_range: number[],
        public IBU_range: number[],
        public alcoholPerc_range: number[],
        public id: number
    ) { }
}