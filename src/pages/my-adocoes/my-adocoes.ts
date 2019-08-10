import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdocaoService } from '../../services/domain/adocao.service';

/**
 * Generated class for the MyAdocoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-adocoes',
  templateUrl: 'my-adocoes.html',
})
export class MyAdocoesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public adocaoService: AdocaoService) {
  }

  ionViewDidLoad() {
   /* this.adocaoService.findById(animal_id)
    .subscribe(response => {
      this.item = response;
      this.getImageUrlIfExists();
    },
    error => {});*/
  }

}
