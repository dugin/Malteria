import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the DistanceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DistanceProvider {

  mainUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  origins = 'origins=';
  destinations = '&destinations=';
  mode = '&mode=walking&language=pt-BR';
  key = '&key=AIzaSyDkx-nCd25j1L80PCaQnSb5qM75HAil38g';

  constructor(private http: Http) {

    console.log('Hello DistanceProvider Provider');
  }

  getDistance(lat1, lon1, lat2, lon2) {

    const query = this.mainUrl + this.origins
      + lat1 + ',' + lon1 + this.destinations + lat2 + ',' + lon2
      + this.mode + this.key;

    return this.http.get(query)
    // Call map on the response observable to get the parsed people object
      .map((response) => {

        if (response.ok) {
          if (response.json().rows[0].elements[0].status.localeCompare('ZERO_RESULTS') === 0)
            return response.json().rows[0].elements[0].status;

          else
            return this.round(response.json().rows[0].elements[0].distance.value / 1000, 1);

        } else
          return response.statusText;

      })
      ;

  }

  round(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

}
