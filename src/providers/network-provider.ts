import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network';
import {Observable} from "rxjs";

/*
 Generated class for the LocationProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NetworkProvider {

  isConnected: boolean;


  constructor(public network: Network) {
    console.log('Hello NetworkProvider Provider');
    this.onDisconnect();
    this.onConnect();

  }

  onDisconnect() {
    this.network.onDisconnect().subscribe(() => {
      console.log('onDisconnect')
      this.isConnected = false;

    })
  }

  onConnect() {
    this.network.onConnect().subscribe(() => {
      console.log('onConnect')
      this.isConnected = true;
    })
  }

  onChange(){

    this.network.onchange().subscribe(() => {
      console.log('onchange')
      this.isConnected = true;
    })
  }


}


