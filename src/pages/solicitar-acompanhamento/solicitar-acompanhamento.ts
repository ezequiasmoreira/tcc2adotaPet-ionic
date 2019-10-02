import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';
import { PessoaService } from '../../services/domain/pessoa.service';
import { PessoaDTO } from '../../models/pessoa.dto';
import { NEW_API_CONFIG } from '../../config/api.config';
import { AdocaoService } from '../../services/domain/adocao.service';
import { AdocaolDTO } from '../../models/adocao.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-solicitar-acompanhamento',
  templateUrl: 'solicitar-acompanhamento.html',
})
export class SolicitarAcompanhamentoPage {

  adocoes;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public acompanhamentoService: AcompanhamentoService,
    public pessoaService: PessoaService,
    public adocaoService: AdocaoService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.adocaoService.obterAdocoesConcluida()      
      .subscribe(response => {
        this.adocoes = response;
      },
      error => {});
  }
  solicitar(adocao_id: string){
    this.acompanhamentoService.solicitarAcompanhamento(adocao_id)      
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});

  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Acompanhamento solicitado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot("AcompanhamentoPesquisaPage");
          }
        }
      ]
    });
    alert.present();
  }
  
}
