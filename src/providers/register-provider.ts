import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*import { ImagePicker, FileChooser } from 'ionic-native';
*/
/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: Http) {
    console.log('Hello RegisterProvider Provider');
  }

 /* getLogoFile(): Promise<any> {


    return FileChooser.open();
  }

  getImages(): Promise<any>  {

   return ImagePicker.getPictures({width: 400});
   
  }*/

}
