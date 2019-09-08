import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RacaDTO } from '../../models/raca.dto';
import { RacaService } from '../../services/domain/raca.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { CidadeDTO } from '../../models/cidade.dto';


@IonicPage()
@Component({
  selector: 'page-home-filtro',
  templateUrl: 'home-filtro.html',
})
export class HomeFiltroPage {

  racas : RacaDTO[];
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public racaService: RacaService,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.racaService.findAll()
      .subscribe(response => {        
        this.racas = response;
        console.log(response);
      },
      error => { });

      this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.updateCidades("1");
      },
      error => {});
  }
  updateCidades(estado_id : string) {
    console.log(estado_id);
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
      },
      error => {});
  }
  pesquisar(nome,genero,porte,castrado,estadoId,cidadeId,racaId){
    let parametros = {
      "nome" : nome == undefined ? "" : nome,
      "genero" : genero,
      "porte" : porte,
      "castrado" : castrado,
      "estadoId" : estadoId,
      "cidadeId" : cidadeId == undefined ? "0" : cidadeId,
      "racaId" : racaId == undefined ? "0" : racaId,
    }
    //this.navCtrl.push('AdocoesSolicitacaoPage',{parametros : parametros});  
  }

}
