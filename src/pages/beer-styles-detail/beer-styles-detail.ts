import {Component, NgZone} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController, NavParams} from 'ionic-angular';
import {BeerStyleModel} from './../../model/beer-style-model';
/*
 Generated class for the BeerStylesDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-beer-styles-detail',
  templateUrl: 'beer-styles-detail.html'
})
export class BeerStylesDetailPage {

  beerStyle: BeerStyleModel;
  isReadMore = false;

  srmMove = 95 / 40;

  widthSelection = 100 / 40;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sanitizer: DomSanitizer,
              public ngZone: NgZone) {

    this.getParam();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BeerStylesDetailPage');
  }

  ionViewDidEnter() {

    this.ngZone.run(() => {
    });


  }


  getParam() {
    this.beerStyle = this.navParams.get('param');


  }

  getSRMSelectionWidth(srmArr: number[]) {


    return (srmArr[1] - srmArr[0]) * this.widthSelection + '%';

  }

  getRange(str: string) {

    const arr = [];

    const min = str.substring(0, str.indexOf('-'));
    const max = str.substring(str.indexOf('-') + 1);

    arr.push(min);
    arr.push(max);


    return arr;
  }

  getImgSanatized(imgURL): any {


    return this.sanitizer.bypassSecurityTrustResourceUrl(imgURL);

  }

}
