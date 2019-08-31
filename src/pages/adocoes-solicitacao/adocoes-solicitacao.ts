import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdocaoService } from '../../services/domain/adocao.service';
import { AdocaolDTO } from '../../models/adocao.dto';
import { API_CONFIG } from '../../config/api.config';
import { ADOCAO_STATUS } from '../../models/adocao-status';



@IonicPage()
@Component({
  selector: 'page-adocoes-solicitacao',
  templateUrl: 'adocoes-solicitacao.html',
})
export class AdocoesSolicitacaoPage {

  items : AdocaolDTO[];
  origem : string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public adocaoService: AdocaoService) {
  }

  ionViewDidLoad() {
    let parametros = this.navParams.get('parametros');
    console.log(parametros);
    this.adocaoService.getAdocoesPorOng()
      .subscribe(response => {
        this.items = response;       
      },
      error => {});

      if (parametros != null){  
        this.origem = "listagem"      
        this.adocaoService.pesquisar(parametros)
        .subscribe(response => {
          console.log(response);
          this.items =response;
        },
        error => {});
      }
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
    adocaoDetalhes(adocao_id : string){
      this.navCtrl.push('AdocaoDetalhesPage',{adocao_id : adocao_id,origem : this.origem});       
    }

}
