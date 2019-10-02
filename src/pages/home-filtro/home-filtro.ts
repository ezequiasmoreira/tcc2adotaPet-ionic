import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RacaDTO } from '../../models/raca.dto';
import { RacaService } from '../../services/domain/raca.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { AnimalService } from '../../services/domain/animal.service';


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
    public animalService: AnimalService,  
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
      "genero" : genero == undefined ? "0" : genero,
      "porte" : porte == undefined ? "0" : porte,
      "castrado" : castrado  == undefined ? "0" : castrado,
      "estadoId" : estadoId == undefined ? "0" : estadoId,
      "cidadeId" : cidadeId == undefined ? "0" : cidadeId,
      "racaId" : racaId == undefined ? "0" : racaId,
    }
    this.animalService.findByFilter(parametros)
    .subscribe(response => {
      this.navCtrl.push('AnimaisPage',{parametros : response, origem : 'homefiltro'});  
    },
    error => {});
    //this.navCtrl.push('AdocoesSolicitacaoPage',{parametros : parametros});  
  }

}
