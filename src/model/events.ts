import {FbEventsModel} from './facebook/fb-events-model';
import * as moment from 'moment';

export class EventsModel {

  constructor(public id?: string,
              public openingHours?: OpeningHours[],
              public producers?: Producer[],
              public fbEvents?: FbEventsModel[]) {
    this.id = id || '';
    this.openingHours = openingHours || new Array<OpeningHours>();
    this.producers = producers || new Array<Producer>();
    this.fbEvents = fbEvents || new Array<FbEventsModel>();
    this.stringToDate();
  }

  compareDate() {

    return this.openingHours[this.openingHours.length - 1].date.isSameOrAfter(moment().locale('pt-BR'), 'day');
  }

  stringToDate() {
    this.openingHours.forEach((opening) => {

      const date = opening.date;

      if (typeof date === 'string')
        opening.date = moment(date);

    });
  }
}
// tslint:disable-next-line:max-classes-per-file
class OpeningHours {

  public close: string;
  public open: string;
  public date: moment.Moment;

  constructor(close?: string,
              open?: string,
              date?: string) {
    this.close = close || '';
    this.open = open || '';
    this.date = moment(date) || null;
  }

}

// tslint:disable-next-line:max-classes-per-file
class Producer {

  public imgURL: string;
  public name: string;


  constructor(imgURL?: string,
              name?: string) {
    this.imgURL = imgURL || '';
    this.name = name || '';

  }

}
