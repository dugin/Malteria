import {EventDetailsPage} from './../pages/event-details/event-details';
import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {LoginPage} from '../pages/login/login';
import {FirebaseProvider} from '../providers/firebase-provider';
import {LocationPage} from './../pages/location/location';
import {FacebookProvider} from './../providers/facebook-provider';
import {MapModal} from "../pages/map-modal/map-modal";
import {EventsPage} from "../pages/events/events";
import {TabsPage} from "../pages/tabs/tabs";
import {BeerStylesPage} from '../pages/beer-styles/beer-styles';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  statusBar = new StatusBar();
  splashScreen = new SplashScreen();


  constructor(platform: Platform,
              firebaseProvider: FirebaseProvider,
              facebookProvider: FacebookProvider) {


    platform.ready().then(() => {
      // this.rootPage = EventsPage;

      this.statusBar.backgroundColorByHexString('#4E1600');


      const subs2 = facebookProvider.isLoggedIn().subscribe((data) => {


        subs2.unsubscribe();
        console.log('facebook ', data);
        if (data.status.localeCompare('unknown') === 0)
          this.rootPage = LoginPage;

        else
          this.rootPage = LocationPage;


      });


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.hideSplashScreen();
    });
  }

  hideSplashScreen() {

    if (this.splashScreen) {
      setTimeout(() => {
        // alert("Vou esconder Splashscreen");
        this.splashScreen.hide();
      }, 1000);
    }
  }
}
