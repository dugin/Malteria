import { ApplicationRef, Component, NgZone } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { NavController, Platform } from 'ionic-angular';
import * as _ from 'lodash';
import { BeerStyleModel } from '../../model/beer-style-model';
import { FirebaseProvider } from '../../providers/firebase-provider';
import { BeerStylesDetailPage } from './../beer-styles-detail/beer-styles-detail';

/*
  Generated class for the BeerStyles page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beer-styles',
  templateUrl: 'beer-styles.html'
})
export class BeerStylesPage {

  isSearching = false;
  isLoading = true;
  searchInput = '';
  aux = new Array<BeerStyleModel>();
  allStyles = new Array<BeerStyleModel>();
  showSubCategory: string[];
  stylesStruct: {
    [key: number]: any[];
  } = {};

stylesCont = -1;

  isIOS = this.platform.is('ios');


  constructor(
    public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider,
    public platform: Platform,
    public applicationRef: ApplicationRef,
    public ngZone: NgZone) { }

  ionViewDidLoad() {
    console.log('Hello BeerStylesPage Page');



    this.getAllStyles();

  }

  ionViewWillEnter() {
    console.log('ionViewDidEnter');

    this.reset();
  }

ionViewDidEnter() {
  this.ngZone.run(()=>{});
}


  onStyleSelected(style: BeerStyleModel) {

    this.navCtrl.push(BeerStylesDetailPage, { param: style });

  }

  reset() {
    this.isSearching = false;
    this.allStyles = _.cloneDeep(this.aux);
    // this.ngZone.run(() => {
    //   this.searchInput = '';
    // });
  }

  onSearchCancel(event) {
    console.log('onSearchCancel ' + event);
    this.reset();
  }

  getStylesFromSearch(ev) {
    // Reset items back to all of the items

    this.reset();

    // set val to the value of the searchbar
    const val = ev.target.value;

    console.log('valor "${val}"');


    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {

      this.allStyles = this.allStyles.filter((item) => {
        return (item.style.toLowerCase().indexOf(val.toLowerCase().replace(/\s/g, '')) > -1);
      });

      this.ngZone.run(() => { this.isSearching = true; });

    }

  }

  capitalizeWord(str: string) {

    str = str.toLowerCase();

    const pieces = str.split(' ');

    for (let i = 0; i < pieces.length; i++) {
      const j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(' ');
  }

  getAllStyles() {

    const obs = this.firebaseProvider.getBeerStyles()
      .subscribe((snapshots) => {

        snapshots.forEach((snapshot) => {

          this.isLoading = false;

          this.allStyles.push(snapshot);

          if(this.stylesCont < snapshot.numberBJCP)
          this.stylesCont = snapshot.numberBJCP;


          if (this.stylesStruct[snapshot.numberBJCP] == null)
            this.stylesStruct[snapshot.numberBJCP] = new Array<any>();

          this.stylesStruct[snapshot.numberBJCP].push(snapshot);


        });

        this.aux = _.cloneDeep(this.allStyles);

        this.setArrowArray();

        obs.unsubscribe();

      },
                 (err) => console.error(err));


  }

  onSubCategory(index: number) {

    if (this.showSubCategory[index].localeCompare('ios-arrow-down') === 0)
      this.showSubCategory[index] = 'ios-arrow-up';

    else
      this.showSubCategory[index] = 'ios-arrow-down';
  }

  private setArrowArray() {

    this.showSubCategory = new Array<string>(this.stylesCont);

    this.showSubCategory = this.showSubCategory.fill('ios-arrow-down');
  }




}
