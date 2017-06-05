import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CameraPosition, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions} from "@ionic-native/google-maps";

/**
 * Generated class for the MapModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModal {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapModal');
    console.log(this.navParams.get('latLng'))
    this.loadMap(this.navParams.get('latLng'));

  }


  loadMap(latLng: LatLng) {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    const element: HTMLElement = document.getElementById('mapNative');

    const map: GoogleMap = this.googleMaps.create(element);


    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      // move the map's camera to position
      map.moveCamera(position);

      // create new marker
      const markerOptions: MarkerOptions = {
        position: eventLocation

      };
      map.clear();
      map.addMarker(markerOptions);
    });
    map.setMyLocationEnabled(true);

    // create LatLng object
    const eventLocation: LatLng = latLng;

    // create CameraPosition
    const position: CameraPosition = {
      target: eventLocation,
      zoom: 14
    };


  }


}
