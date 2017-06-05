import {Geoposition} from '@ionic-native/geolocation';

export class LocationModel {

    constructor(
        public geoPosition?: Geoposition,
        public city?: string,
        public state?: string
        ){

        }
}
