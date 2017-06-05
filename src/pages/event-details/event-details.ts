import {EventsModel} from './../../model/events';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {
  CameraPosition, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker,
  MarkerOptions
} from '@ionic-native/google-maps';
import {MapModal} from "../map-modal/map-modal";

/*
 Generated class for the EventDetails page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  lat: number;
  lon: number;

  event: EventsModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleMaps: GoogleMaps) {

    this.event = navParams.get('event');

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad EventDetailsPage');

    console.log(this.event);


    if (this.event.fbEvents[0].place &&
      this.event.fbEvents[0].place.location &&
      this.event.fbEvents[0].place.location.latitude &&
      this.event.fbEvents[0].place.location.longitude
    ) {

      this.lat = Number.parseFloat(this.event.fbEvents[0].place.location.latitude);
      this.lon = Number.parseFloat(this.event.fbEvents[0].place.location.longitude);


      this.initMap();
    }

  }

  onMapModal() {
    this.navCtrl.push(MapModal, {
      latLng: new LatLng(
        this.lat,
        this.lon
      )
    });
  }


  initMap() {

    const myLatLng = {
      lat: this.lat,
      lng: this.lon
    };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: myLatLng,
      disableDefaultUI: true,
    });

    // const pinIcon = new google.maps.MarkerImage(
    //   'assets/icon/localizacao_brown.svg',
    //   null, /* size is determined at runtime */
    //   null, /* origin is 0,0 */
    //   null, /* anchor is bottom center of the scaled image */
    //   new google.maps.Size(40, 40),
    // );

    new google.maps.Marker({
      position: myLatLng,
      map: map,
      // icon: pinIcon,
    });
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    const element: HTMLElement = document.getElementById('map');

    const map: GoogleMap = this.googleMaps.create(element);


    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    const eventLocation: LatLng = new LatLng(
      this.lat,
      this.lon);


    // create CameraPosition
    const position: CameraPosition = {
      target: eventLocation,
      zoom: 14
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    const markerOptions: MarkerOptions = {
      position: eventLocation

    };

    map.addMarker(markerOptions);

  }


  onBack() {

    this.navCtrl.pop()
      .catch((err) => console.log(err));
    ;


  }

}
