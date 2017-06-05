import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { BeerProducerPage } from '../beer-producer/beer-producer';
import { BeerStylesPage } from '../beer-styles/beer-styles';
import { EventsPage } from '../events/events';

@Component({
   selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = EventsPage;
  tab2Root: any = BeerProducerPage;
  tab3Root: any = BeerStylesPage;

  constructor(

  ) {



}




}
