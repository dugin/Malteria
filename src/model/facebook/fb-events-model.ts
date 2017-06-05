import { FbPlaceModel } from './fb-place-model';
import * as moment from 'moment';
import 'moment/locale/pt-br';

export class FbEventsModel {



    constructor(
        public name?: string,
        public attending_count?: string,
        public coverURL?: string,
        public description?: string,
        public is_canceled?: boolean,
        public owner?: Owner,
        public place?: FbPlaceModel,
        public start_t?: string,
        public end_t?: string,
        public distance?: number,
        public date?: moment.Moment,

    ) {
        moment.locale('pt-BR');
    }


}

// tslint:disable-next-line:max-classes-per-file
export class Owner {

    constructor(
        public id: string,
        public name: string,
        public imgURL?: string,
    ) { }
}
