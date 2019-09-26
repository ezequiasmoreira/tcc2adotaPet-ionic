import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcompanhamentoDTO } from '../../models/acompanhamento.dto';
import { NEW_API_CONFIG } from '../../config/api.config';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';

@IonicPage()
@Component({
  selector: 'page-acompanhamento-listagem',
  templateUrl: 'acompanhamento-listagem.html',
})
export class AcompanhamentoListagemPage {

  items : AcompanhamentoDTO[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public acompanhamentoService: AcompanhamentoService) {
  }

  ionViewDidLoad() {
    let parametros = this.navParams.get('parametros');
    let origem = this.navParams.get('origem');
    if (origem == 'acompanhamentoFiltro'){
      this.items = parametros;
      this.loadImageUrls();
    }
    
  }
  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      item.imageUrl = `${NEW_API_CONFIG.baseUrl}/acompanhamento/acomp${item.id}.jpg`;
      
    }
  }
  showDetail(acompanhamento_id : string) {
    this.navCtrl.push('AcompanhamentoDetalhesPage', {acompanhamento_id: acompanhamento_id});
  }

}
