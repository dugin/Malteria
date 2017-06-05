import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {PreloadAllModules} from '@angular/router';


// directives
import {ParallaxHeader} from './../components/parallax-header/parallax-header';

// pages
import {MapPage} from '../pages/map/map';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {LocationPage} from '../pages/location/location';
import {EventsPage} from '../pages/events/events';
import {BeerProducerPage} from '../pages/beer-producer/beer-producer';
import {BeerStylesPage} from '../pages/beer-styles/beer-styles';
import {BeerStylesDetailPage} from './../pages/beer-styles-detail/beer-styles-detail';
import {BeerProducerDetailPage} from './../pages/beer-producer-detail/beer-producer-detail';
import {ProducerBeerPage} from './../pages/producer-beer/producer-beer';
import {EventDetailsPage} from './../pages/event-details/event-details';


// providers
import {LoginProvider} from '../providers/login-provider';
import {LocationProvider} from '../providers/location-provider';
import {RegisterProvider} from '../providers/register-provider';
import {MapProvider} from '../providers/map-provider';
import {FirebaseProvider} from '../providers/firebase-provider';
import {FacebookProvider} from './../providers/facebook-provider';
import {DistanceProvider} from './../providers/distance-provider';
import {EventProvider} from './../providers/event-provider';
import {GeocodingProvider} from './../providers/geocoding-provider';

// plugin
import {Diagnostic} from '@ionic-native/diagnostic';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Facebook} from '@ionic-native/facebook';
import {StatusBar} from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';
import {GeolocationMock} from './native.mock';
import {MapModal} from "../pages/map-modal/map-modal";
import {NetworkProvider} from "../providers/network-provider";
import {Network} from "@ionic-native/network";
import {Options} from '../pages/options/options';


// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyD6bva4-l3pvjSIDBAuYWySIsmMbC_7mTI',
  authDomain: 'artesa-152017.firebaseapp.com',
  databaseURL: 'https://artesa-152017.firebaseio.com',
  storageBucket: 'artesa-152017.appspot.com',
  messagingSenderId: '1020374440248'
};

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    TabsPage,
    LoginPage,
    LocationPage,
    EventsPage,
    BeerProducerPage,
    BeerStylesPage,
    BeerStylesDetailPage,
    BeerProducerDetailPage,
    ParallaxHeader,
    ProducerBeerPage,
    EventDetailsPage,
    MapModal,
    Options

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    TabsPage,
    LoginPage,
    LocationPage,
    EventsPage,
    BeerProducerPage,
    BeerStylesPage,
    BeerStylesDetailPage,
    BeerProducerDetailPage,
    ProducerBeerPage,
    EventDetailsPage,
    MapModal,
    Options


  ],
  providers: [
    Facebook,
    SplashScreen,
    StatusBar,
    GoogleMaps,
    Diagnostic,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Geolocation, useClass: GeolocationMock},
    LoginProvider,
    LocationProvider,
    RegisterProvider,
    MapProvider,
    FirebaseProvider,
    FacebookProvider,
    DistanceProvider,
    EventProvider,
    GeocodingProvider,
    NetworkProvider


  ]
})
export class AppModule {
}

