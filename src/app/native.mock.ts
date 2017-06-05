import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';


export class GeolocationMock extends Geolocation {

    static getCurrentPosition(options?: GeolocationOptions): Promise<Geoposition> {
        return new Promise((resolve, reject) => {
            resolve({ coords: { latitude: -22.984077, longitude: -43.208673 } })
        });
    }
}
