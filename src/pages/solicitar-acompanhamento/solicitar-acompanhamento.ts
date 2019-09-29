import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';
import { PessoaService } from '../../services/domain/pessoa.service';
import { PessoaDTO } from '../../models/pessoa.dto';
import { NEW_API_CONFIG } from '../../config/api.config';
import { AdocaoService } from '../../services/domain/adocao.service';
import { AdocaolDTO } from '../../models/adocao.dto';


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
    public adocaoService: AdocaoService) {
  }

  ionViewDidLoad() {
    this.adocaoService.obterAdocoesConcluida()      
      .subscribe(response => {
        console.log(response);
        this.adocoes = response;
      },
      error => {});
  }
  
}
