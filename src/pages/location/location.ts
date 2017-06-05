import {Component, ApplicationRef} from "@angular/core";
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {LocationProvider} from '../../providers/location-provider';
import {LocationModel} from '../../model/location-model';
import {EventsPage} from "../events/events";
import {EventProvider} from "../../providers/event-provider";

/*
 Generated class for the Location page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  city: string = null;
  static alreadyCreated = false;

  constructor(public navCtrl: NavController,
              public locationProvider: LocationProvider,
              public applicationRef: ApplicationRef) {
  }

  ionViewDidLoad() {
    console.log('Hello LocationPage Page');


    //   this.navCtrl.setRoot(TabsPage);

    if (!LocationPage.alreadyCreated)
      this.getCity();

    LocationPage.alreadyCreated = true;

  }

  ionViewCanEnter(): boolean {

    return !LocationPage.alreadyCreated;
  }

  getCity() {

    const obs = this.locationProvider.getMyCity()
      .subscribe((data) => {

          this.city = data.city + ' - ' + data.state;
          this.applicationRef.tick();

          EventProvider.myLocation = data;
          this.goToMainPage();
        },
        (error) => console.error('getCity', error),
        () => {
          console.log('location complete');
          obs.unsubscribe();
        }
      );

  }

  goToMainPage() {

    setTimeout(() => {
      this.navCtrl.setRoot(TabsPage );
    }, 1500);

  }

}
