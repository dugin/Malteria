import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import {Observable, Observer} from 'rxjs/Rx';
import {EventsModel} from './../model/events';
import {FbEventsModel, Owner} from './../model/facebook/fb-events-model';
import {LocationModel} from './../model/location-model';
import {DistanceProvider} from './distance-provider';
import {FacebookProvider} from './facebook-provider';
import {FirebaseProvider} from './firebase-provider';

import 'rxjs';
/*
 Generated class for the EventProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class EventProvider {

  static myLocation: LocationModel;
  eventsAmount;

  constructor(public firebaseProvider: FirebaseProvider,
              private facebookProvider: FacebookProvider,
              private distanceProvider: DistanceProvider) {
    console.log('Hello EventProvider Provider');
    moment.locale('pt-BR');

  }

  rebindAll() {
    _.bindAll(this, ['getEventsHappening', 'getEventInfo', 'getEventOwnerImg', 'calcDistance']);
  }

  getEvents() {

    this.rebindAll();

    return this.getEventsHappening()
      .mergeMap(this.loopOnEvents)
      .mergeMap(this.getEventInfo, 1)
      .mergeMap(this.calcDistance);
  }

  getEventsHappening() {

    return this.firebaseProvider.getFBEvents()
      .map(this.isEventOver)
      .do((events) => this.eventsAmount = events.length);

  }

  loopOnEvents(events: EventsModel[]) {

    return Observable.from(events)


  }

  getEventInfo(event: EventsModel) {


    return this.facebookProvider.getEventJSON(event.id)
      .map((json) => {
        return this.setFBOBjFromJson(event, json);

      });

  }

  getEventOwnerImg(event: EventsModel) {


    return this.facebookProvider.getEventOwnerPictureJSON(event.fbEvents[0].owner.id)
      .map((json) => {

        event.fbEvents.forEach(val => {
          val.owner.imgURL = json.data.url;

        })
        return event;
      });

  }

  calcDistance(event: EventsModel): Observable<EventsModel> {

    return new Observable<EventsModel>((observer: Observer<EventsModel>) => {

      if (event !== null
        && event.fbEvents[0].place !== null
        && event.fbEvents[0].place.location !== null
        && event.fbEvents[0].place.location.latitude !== null)

        this.distanceProvider.getDistance(
          EventProvider.myLocation.geoPosition.coords.latitude,
          EventProvider.myLocation.geoPosition.coords.longitude,
          event.fbEvents[0].place.location.latitude,
          event.fbEvents[0].place.location.longitude)

          .subscribe((distance) => {

              if (typeof distance === 'string')
                console.error(distance);

              else {

                event.fbEvents[0].distance = distance;

                observer.next(this.setDaysEvent(event));
                observer.complete();

              }

            },
            (err) => console.error(err)
          );

      else {
        observer.next(this.setDaysEvent(event));
        observer.complete();
      }
    });

  }


  sortEvents(fbEvents: FbEventsModel[]) {

    return fbEvents.sort((a: FbEventsModel, b: FbEventsModel) => {

      if (a.date.isAfter(b.date))
        return 1;
      else if (a.date.isSame(b.date)) {
        if (a.distance > b.distance)
          return 1;
        else if (a.distance < b.distance)
          return -1;
        else
          return 0;
      }
      else
        return -1;
    });

  }

  private isEventOver(fbEvents: any[]) {

    const events: EventsModel[] = [];

    fbEvents.forEach((event) => {

      const temp = new EventsModel(event.id, event.openingHours, event.producers);

      if (temp.compareDate())
        events.push(temp);
    });

    return events;

  }

  private setDaysEvent(event: EventsModel) {

    const temp = event.fbEvents.pop();

    event.openingHours.forEach((opening) => {

      if (opening.date.isSameOrAfter(moment().locale('pt-BR'), 'day')) {

        const j = event.fbEvents.push(_.cloneDeep(temp));

        event.fbEvents[j - 1].start_t = opening.open;
        event.fbEvents[j - 1].end_t = opening.close;
        event.fbEvents[j - 1].date = opening.date;
      }

    });


    return event;


  }

  private setFBOBjFromJson(event: EventsModel, json) {

    console.log('setFBOBjFromJson', json);

    event.fbEvents.push(new FbEventsModel(
      json.name,
      json.attending_count,
      json.cover.source,
      json.description,
      json.is_canceled,
      new Owner(json.owner.id, json.owner.name),
      json.place
    ));

    return event;

  }


}
