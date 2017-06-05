import { LocationModel } from './location-model';
import { ContactModel } from './contact-model';


export class ProducerModel {


    constructor(
      
        public cnpf: string,
        public nome: string,
        public desc: string,
        public logoURI : string,
        public photosURI : string[],
        public locationModel: LocationModel,
        public contactModel: ContactModel,
        public id: number
        

    ) {

    }


}