import { ProducerBeerPage } from './../producer-beer/producer-beer';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the BeerProducerDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beer-producer-detail',
  templateUrl: 'beer-producer-detail.html'
})
export class BeerProducerDetailPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ngZone: NgZone) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeerProducerDetailPage');
  }

  ionViewDidEnter() {
    this.ngZone.run(() => { });
  }

  onBeerDetail() {
    this.navCtrl.push(ProducerBeerPage)
  }


}
