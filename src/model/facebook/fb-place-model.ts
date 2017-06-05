import { FbLocationModel } from "./fb-location-model";


export class FbPlaceModel {


    constructor(
        public id: string,
        public location: FbLocationModel,
        public name: string,

    ) { }

}