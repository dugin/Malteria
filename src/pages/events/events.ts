import {EventDetailsPage} from './../event-details/event-details';
import {EventsModel} from './../../model/events';
import {EventProvider} from './../../providers/event-provider';
import {FbEventsModel} from './../../model/facebook/fb-events-model';
import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as moment from 'moment';
import {FacebookProvider} from "../../providers/facebook-provider";
import {FirebaseProvider} from "../../providers/firebase-provider";
import {UserModel} from "../../model/user-model";
import {Observable} from 'rxjs';
import {Options} from '../options/options';
/*
 Generated class for the Events page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  // static alreadyCreated = 0;
  fbEvents = new Array<FbEventsModel>();
  events = new Array<EventsModel>();
  isLoading = true;
  isLoggedIn: boolean;


  constructor(public navCtrl: NavController,
              public sanitizer: DomSanitizer,
              public navParams: NavParams,
              public eventProvider: EventProvider,
              public ngZone: NgZone,
              public facebookProvider: FacebookProvider,
              public firebaseProvider: FirebaseProvider,
              private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('Hello EventsPage Page');

    this.isLogged();

  }

  isLogged() {

    const subs = this.facebookProvider.isLoggedIn().subscribe((data) => {

      this.isLoggedIn = data.status.localeCompare('unknown') !== 0 && data.status.localeCompare('not_authorized') !== 0;

      if (this.isLoggedIn)
        this.getEvents();

      else
        this.isLoading = false;

      subs.unsubscribe();

    });
  }

  ionViewDidEnter() {

    this.ngZone.run(() => {
    });


  }

  onEvent(fbEvent: FbEventsModel) {

    let x;

    for (const i in this.events) {

      if (this.events.hasOwnProperty(i)) {

        if (this.events[i].fbEvents[0].name.localeCompare(fbEvent.name) == 0) {

          this.events[i].fbEvents = new Array<FbEventsModel>();
          this.events[i].fbEvents.push(fbEvent);
          x = this.events[i];

          break;

        }
      }
    }

    console.log('push ', x);
    this.navCtrl.push(EventDetailsPage, {event: x})
      .then((data) => {
        console.log('push ', data);
      })
      .catch(err => {
        console.error(err);
      });


  }

  getEvents() {


    const obs = this.eventProvider.getEvents()
      .subscribe((data) => {

          console.log('getEvents', data);

          this.events.push(data);

          this.fbEvents = this.fbEvents.concat(data.fbEvents);
          this.fbEvents = this.eventProvider.sortEvents(this.fbEvents);

          this.isLoading = false;

          if (this.eventProvider.eventsAmount === this.events.length) {

            this.setOwnerImage();

            obs.unsubscribe();
          }
        },
        (err) => console.error(err));


  }


  presentOptions(event) {

    console.log('presentOptions');

    this.popoverCtrl.create(Options).present({
      ev: event
    });
  }

  setOwnerImage() {

    Observable.from(this.events)
      .mergeMap(this.eventProvider.getEventOwnerImg, 1)
      .subscribe((data) => {
        console.log('getEventOwnerImg ---', data);
      });

  }

  isMinuteZero(time: moment.Moment): string {

    return time.minute() === 0 ? null : time.format('mm');
  }


  getImgSanatized(imgURL): any {

    return this.sanitizer.bypassSecurityTrustUrl(imgURL);

  }

  // ionViewCanEnter(): boolean {
  //
  //   EventsPage.alreadyCreated++;
  //
  //   return EventsPage.alreadyCreated != 2;
  // }

  onLogin() {
    console.log('onLogin');


    const obs = this.facebookProvider.logIn()
      .mergeMap((fbResponse) => {
        console.log('fbResponse');

        console.dir(fbResponse);

        return this.firebaseProvider.loginWithFacebook(fbResponse);

      }, 1)
      .retryWhen((e) => e.scan<number>((errorCount, err) => {
        if (errorCount >= 10) {
          throw err;
        }
        return errorCount + 1;
      }, 0).delay(1000))
      .mergeMap((data: any) => {

        const user: UserModel = data.providerData[0];
        user.id = data.uid;

        return this.firebaseProvider.pushUser(user);

      }, 1)
      .subscribe((user) => {

        console.dir(user);
        obs.unsubscribe();

        this.isLogged();

      });

  }

}


