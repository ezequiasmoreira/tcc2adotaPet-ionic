import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RacaService } from '../../services/domain/raca.service';

/**
 * Generated class for the RacasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-racas',
  templateUrl: 'racas.html',
})
export class RacasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public racaService: RacaService) {
  }

  ionViewDidLoad() {
    this.racaService.findAll()
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    //console.log('ionViewDidLoad RacasPage');
  }

}
