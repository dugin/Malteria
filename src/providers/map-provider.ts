import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import {
  GoogleMap,
  GoogleMapsEvent,
  LatLng

} from '@ionic-native/google-maps';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapProvider {

  map: GoogleMap;

  constructor() {
    console.log('Hello MapProvider Provider');
  }

  loadMap(lat: number, lon: number) {
    const location = new LatLng(lat, lon);

    this.map = new GoogleMap('map', {
      backgroundColor: 'white',
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera: {
        latLng: location,
        tilt: 30,
        zoom: 15,
        bearing: 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });

  }

}
