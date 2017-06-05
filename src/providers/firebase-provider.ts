import {Inject, Injectable} from '@angular/core';
import {AngularFire, FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';


import {Observable} from 'rxjs/Rx';
import {UserModel} from './../model/user-model';


/*
 Generated class for the FirebaseProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FirebaseProvider {

  constructor(@Inject(FirebaseApp) public firebaseApp: any,
              public af: AngularFire) {
    console.log('Hello FirebaseProvider Provider');

  }

  getFBEvents() {

    return this.af.database.list('events');

  }

  getBeerColors() {
    return this.af.database.list('beerColors');

  }

  getBeerStyles() {

    return this.af.database.list('beerStyles');

  }


  loginWithFacebook(fbResponse) {

    return new Observable((observer) => {

      const provider = firebase.auth.FacebookAuthProvider.credential(fbResponse.authResponse.accessToken);

      this.firebaseApp.auth().signInWithCredential(provider)
        .then((resolve) => {

          observer.next(resolve);
          observer.complete();

        })
        .catch((err) => {
          console.error(err);
          observer.error(err);
        });
    });
  }

  isLoggedIn() {
    return this.firebaseApp.auth();
  }

  logOut() {
    return this.firebaseApp.auth().signOut();
  }

  pushUser(user: UserModel) {

    const key = user.id;

    delete user.id;

    return new Observable<UserModel>((observer) => {

      this.af.database.object('users/' + key)
        .set(user)
        .then(() => {
          user.id = key;
          observer.next(user);
          observer.complete();
        })
        .catch((err) => {
          console.error(err);
          observer.error(err);
        });


    });

  }


}
