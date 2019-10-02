import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';
import { AcompanhamentoDTO } from '../../models/acompanhamento.dto';

@IonicPage()
@Component({
  selector: 'page-acompanhamento-solicitado',
  templateUrl: 'acompanhamento-solicitado.html',
})
export class AcompanhamentoSolicitadoPage {

  items : AcompanhamentoDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public acompanhamentoService: AcompanhamentoService) {
  }

  ionViewDidLoad() {
    this.acompanhamentoService.solicitado()      
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }
  gerarAcompanhamento(acompanhamento_id : string){
    this.navCtrl.push('AcompanhamentoDetalhesPage', {acompanhamento_id: acompanhamento_id,origem: 'usuario'});
  }

}
