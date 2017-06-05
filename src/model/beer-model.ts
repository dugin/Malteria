import { BeerStyleModel } from "./beer-style-model";

export class BeerModel {


    constructor(
        public name: string,
        public desc: string,
        public variety: BeerStyleModel,
        public labelURI: string,
        public photosURI: string[],
        public id: number,

    ) {

    }

}