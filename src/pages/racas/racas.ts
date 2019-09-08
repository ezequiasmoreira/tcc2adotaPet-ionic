import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RacaService } from '../../services/domain/raca.service';
import { RacaDTO } from '../../models/raca.dto';
import { API_CONFIG } from '../../config/api.config';

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

  ImageUrl: string = API_CONFIG.imageBaseUrl+"/racas";

  items: RacaDTO[];
  column: string = 'descricao';

  constructor(public navCtrl: NavController, public navParams: NavParams, public racaService: RacaService) {
  }

  ionViewDidLoad() {
    this.racaService.findAll()
      .subscribe(response => {        
        this.items = response;
      },
      error => { });
    //console.log('ionViewDidLoad RacasPage');
  }
  showAnimais(raca_id : string) {
    this.navCtrl.push('AnimaisPage',{raca_id : raca_id});    
  }

}
