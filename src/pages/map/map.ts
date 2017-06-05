import { Component } from '@angular/core';
import { MapProvider } from '../../providers/map-provider';
import { NavController, NavParams } from 'ionic-angular';
import { LocationModel } from '../../model/location-model';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  location: LocationModel;

  constructor(
    public navCtrl: NavController,
    public mapProvider: MapProvider,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.getParams();
    this.mapProvider.loadMap(this.location.geoPosition.coords.latitude, this.location.geoPosition.coords.longitude);
  }


  private getParams() {
    this.location = this.navParams.data;

  }

}
