import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdocaoService } from '../../services/domain/adocao.service';
import { AdocaolDTO } from '../../models/adocao.dto';
import { API_CONFIG } from '../../config/api.config';
import { ADOCAO_STATUS } from '../../models/adocao-status';

@IonicPage()
@Component({
  selector: 'page-adocao-detalhes',
  templateUrl: 'adocao-detalhes.html',
})
export class AdocaoDetalhesPage {

  item : AdocaolDTO;
  caminho : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public adocaoService: AdocaoService) {
  }

  ionViewDidLoad() {
    let adocao_id = this.navParams.get('adocao_id');
    this.adocaoService.getAdocaoById(adocao_id)
      .subscribe(response => {
        this.item = response;
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
  mostrarAnimal(animal_id : string){
    this.navCtrl.push('AnimalDetailPage',{animal_id : animal_id,habilita : "false"});    
  }
  finalizar(status : string){     
    let adocao = {
      "id" : this.item.id,
      "status" : status
    }
    this.adocaoService.atualizaAdocao(adocao)
    .subscribe(response => {       
      this.navCtrl.setRoot("AdocoesPainelPage");
    },
    error => {
      console.log(error);
    });
  }

}
