import {Facebook} from '@ionic-native/facebook';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
/*
 Generated class for the Facebook provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FacebookProvider {


  constructor(private fb: Facebook) {
    console.log('Hello FacebookProvider Provider');
  }

  isLoggedIn(): Observable<any> {

    return new Observable<any>((obs) => {

      this.fb.getLoginStatus()
        .then((done) => {
          obs.next(done);
          obs.complete();

        })
        .catch((err) => {

          obs.error(err);
        });


    });


  }

  logOut(): Observable<any> {
    return new Observable<any>((obs) => {

      this.fb.logout()
        .then((done) => {
          obs.next(done);
          obs.complete();

        })
        .catch((err) => {
          obs.error(err);
        });


    });

  }

  logIn(): Observable<any> {

    return new Observable<any>((obs) => {

      this.fb.login(['public_profile', 'email', 'user_friends'])
        .then((done) => {


          obs.next(done);
          obs.complete();

        })
        .catch((err) => {

          obs.error(err);
        });


    });


  }


  getEventJSON(eventID: string): Observable<any> {

    return new Observable<any>((obs) => {

      this.fb.api(`/${eventID}?fields=name,attending_count,cover,description,is_canceled,owner,start_time,end_time,place`, [])
        .then((done) => {
          obs.next(done);
          obs.complete();

        })
        .catch((err) => {
          obs.error(err);
        });

    });


  }

  getEventOwnerPictureJSON(ownerID: string): Observable<any> {
    return new Observable<any>((obs) => {

      this.fb.api(ownerID + '/picture?type=large&redirect=false', [])
        .then((done) => {
          obs.next(done);
          obs.complete();

        })
        .catch((err) => {
          obs.error(err);
        });


    });
  }

}












