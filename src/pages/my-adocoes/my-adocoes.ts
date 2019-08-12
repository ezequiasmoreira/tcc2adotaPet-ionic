import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdocaoService } from '../../services/domain/adocao.service';
import { AdocaolDTO } from '../../models/adocao.dto';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';
import { API_CONFIG } from '../../config/api.config';
import { ADOCAO_STATUS } from '../../models/adocao-status';

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
  items : AdocaolDTO[];
  caminho : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public adocaoService: AdocaoService,
    public animalService: AnimalService) {
  }

  ionViewDidLoad() {
   this.adocaoService.getAdocoesUser()
    .subscribe(response => {
      this.items = response;  
      this.caminho = API_CONFIG.imageBaseUrl +"/animais/an";    
    },
    error => {});
  }
  getDescricaoStatus(status : string){
    if (status == ADOCAO_STATUS.AGUARDANDO){
      return "Aguardado analise";
    }
    if (status == ADOCAO_STATUS.ANALISE){
      return "Em analise";
    }
    if (status == ADOCAO_STATUS.REJEITADO){
      return "Adoção rejeitada";
    }
    if (status == ADOCAO_STATUS.APROVADO){
      return  "Adoção aprovada";
    }    
    return null;
  }

}
