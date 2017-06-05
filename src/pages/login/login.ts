import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {NetworkProvider} from '../../providers/network-provider';
import {LocationPage} from '../location/location';
import {UserModel} from './../../model/user-model';
import {FacebookProvider} from './../../providers/facebook-provider';
import {FirebaseProvider} from './../../providers/firebase-provider';

/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public facebookProvider: FacebookProvider,
              public firebaseProvider: FirebaseProvider,
              public networkProvider: NetworkProvider,
              private alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

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

        this.navCtrl.setRoot(LocationPage, {param: user});

      });

  }

  onSkip() {
    this.navCtrl.setRoot(LocationPage);
  }


  presentAlert() {
    this.alertCtrl.create({
      title: 'Sem conexão',
      subTitle: 'Verifique a sua conexão com a internet',
      buttons: ['Dismiss']
    })
      .present();

  }

}
