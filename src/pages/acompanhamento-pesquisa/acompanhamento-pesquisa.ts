import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalService } from '../../services/domain/animal.service';
import { AnimalDTO } from '../../models/animal.dto';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';

@IonicPage()
@Component({
  selector: 'page-acompanhamento-pesquisa',
  templateUrl: 'acompanhamento-pesquisa.html',
})
export class AcompanhamentoPesquisaPage {

  animais : AnimalDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public animalService: AnimalService,
    public acompanhamentoService: AcompanhamentoService) {
  }

  ionViewDidLoad() {
    this.animalService.findAll("1")
      .subscribe(response => {
        this.animais = response;
      },
      error => {});
  }
  pesquisar(status,animalId){
    
    let parametros = {
      "status" : status == undefined ? "0" : status,
      "animalId" : animalId == undefined ? "0" : animalId
    }    
    this.acompanhamentoService.findByFilter(parametros)
    .subscribe(response => {
      console.log(response);
      this.navCtrl.push('AcompanhamentoListagemPage',{parametros : response, origem : 'acompanhamentoFiltro'});  
    },
    error => {});
    
  }

}
