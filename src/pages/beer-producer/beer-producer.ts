import { BeerProducerDetailPage } from './../beer-producer-detail/beer-producer-detail';
import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

/*
  Generated class for the BeerProducer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beer-producer',
  templateUrl: 'beer-producer.html',
})
export class BeerProducerPage {

  isIOS = this.platform.is('ios');


  constructor(public navCtrl: NavController,
    public platform: Platform,
    public ngZone: NgZone) { }

  ionViewDidLoad() {
    console.log('Hello BeerProducerPage Page');
  }


  ionViewDidEnter() {
    this.ngZone.run(() => { });

  }

  onProducer() {
    this.navCtrl.push(BeerProducerDetailPage);
  }

}
