import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';
import { NEW_API_CONFIG } from '../../config/api.config';
import { AcompanhamentoDTO } from '../../models/acompanhamento.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalDTO } from '../../models/animal.dto';


@IonicPage()
@Component({
  selector: 'page-acompanhamento-detalhes',
  templateUrl: 'acompanhamento-detalhes.html',
})
export class AcompanhamentoDetalhesPage {

  item: AcompanhamentoDTO;
  formGroup: FormGroup;
  caminho : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public acompanhamentoService: AcompanhamentoService) {
      this.formGroup = this.formBuilder.group({
        id: ['', []],
        animal: ['', []],
        codigo: ['', [Validators.required]],
        descricao : ['', [Validators.required]],
        status : ['', [Validators.required]],
        situacao : ['',[Validators.required]],
        observacao : ['', []],
        dataAgendado : ['', []]      
      });
  }

  ionViewDidLoad() {
    let acompanhamento_id = this.navParams.get('acompanhamento_id');
    this.acompanhamentoService.getAcompanhamentoById(acompanhamento_id)
      .subscribe(response => {
        this.item = response;
        this.formGroup.controls.id.setValue(this.item.id);
        this.formGroup.controls.animal.setValue(this.item.animal);
        this.formGroup.controls.codigo.setValue(this.item.codigo);
        this.formGroup.controls.descricao.setValue(this.item.descricao);
        this.formGroup.controls.status.setValue(this.item.status);
        this.formGroup.controls.situacao.setValue(this.item.situacao);
        this.formGroup.controls.observacao.setValue(this.item.observacao);
        if (this.item.dataAgendado != null){
          this.formGroup.controls.dataAgendado.setValue(this.converterData(this.item.dataAgendado));
        }        
        this.item = response;
        this.caminho = NEW_API_CONFIG.imageBaseUrl +"/acompanhamento/acomp"; 
      },
      error => {});
  }
  converterData(data : string){ 
    let split = data.split('/');
    let dia = split[0];
    let mes = split[1];
    let ano = split[2];
    return ano + '-' + (mes) + '-' + dia;
  }
  converterDataBrasil(data : string){  
    let split = data.split('/');
    let ano = split[0];
    let mes = split[1];
    let dia = split[2];
    return dia + '/' + (mes) + '/' + ano;
  }
  salvar(){
    this.formGroup.value.dataAgendado =this.converterDataBrasil(this.formGroup.value.dataAgendado.replace(/-/g,'/'));
    this.acompanhamentoService.atualizaAcompanhamento(this.formGroup.value)
    .subscribe(response => {   
      this.navCtrl.setRoot("AcompanhamentoPesquisaPage");
    },
    error => {});
  }

}
