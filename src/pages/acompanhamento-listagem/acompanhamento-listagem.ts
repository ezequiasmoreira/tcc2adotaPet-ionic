import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-acompanhamento-listagem',
  templateUrl: 'acompanhamento-listagem.html',
})
export class AcompanhamentoListagemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcompanhamentoListagemPage');
  }

}
