import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from 'rxjs';
import {FacebookProvider} from '../../providers/facebook-provider';
import {FirebaseProvider} from '../../providers/firebase-provider';
import {TabsPage} from '../tabs/tabs';

/**
 * Generated class for the Options page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class Options {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController, public facebookService: FacebookProvider, public firebaseService: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Options');
  }

  logOut() {

    this.promptLogOut();
  }

  private promptLogOut() {

    const alert = this.alertCtrl.create({
      title: 'Sair',
      message: 'Tem certeza que deseja fazer logout?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.facebookService.logOut()
              .mergeMap(() => Observable.fromPromise(this.firebaseService.logOut()))
              .mergeMap(() => Observable.fromPromise(this.navCtrl.removeView(this.viewCtrl)))
              .subscribe((success) => {
                this.navCtrl.setRoot(TabsPage);
                console.log('logOut: ' + success);

              });
          }
        }
      ]
    });
    alert.present();
  }

}
