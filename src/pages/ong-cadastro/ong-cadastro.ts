import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { OngService } from '../../services/domain/ong.service';
import { OngDTO } from '../../models/ong.dto';

@IonicPage()
@Component({
  selector: 'page-ong-cadastro',
  templateUrl: 'ong-cadastro.html',
})
export class OngCadastroPage {

  acao: string ="NOVO";
  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  ongDTO : OngDTO;
  ong;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public ongService: OngService,
    public alertCtrl: AlertController
    ) {
      this.ong = this.navParams.get('ong');
      this.formGroup = this.formBuilder.group({
        razao_Social:  [this.ong != undefined ? ""+this.ong.razao_Social : "", [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        nome_Fantasia: [this.ong != undefined ? ""+this.ong.nome_Fantasia : "", [Validators.required]],
        cnpj : [this.ong != undefined ? ""+this.ong.cnpj : "", [Validators.minLength(11), Validators.maxLength(14)]],       
        logradouro : [this.ong != undefined ? ""+this.ong.logradouro : "", []],
        numero : [this.ong != undefined ? ""+this.ong.numero : "", []],
        complemento : [this.ong != undefined ? ""+this.ong.complemento:"",[]],
        bairro : [this.ong != undefined ? ""+this.ong.bairro:"", []],
        cep : [this.ong != undefined ? ""+this.ong.cep : "", [Validators.required]],
        estadoId : ['', [Validators.required]],
        cidadeId : ['', [Validators.required]]      
      });
  }

  ionViewDidLoad() {
    this.ong = this.navParams.get('ong');
    console.log(this.ong);
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        if (this.ong != undefined){                
          this.formGroup.controls.estadoId.setValue(this.ong.cidade.estado.id);
          this.formGroup.controls.cidadeId.setValue(this.ong.cidade.id);
          this.acao = "EDITAR";
        }
        this.updateCidades();        
      },
      error => {});     
      
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        if (this.ong == undefined){
          this.formGroup.controls.cidadeId.setValue(null);
        }
      },
      error => {});
  }
  salvar() {   
    this.ongDTO = this.formGroup.value

    if(this.acao == "EDITAR"){
      this.ongDTO.id = this.ong.id;
      this.editar();
    }

    if(this.acao == "NOVO"){
      this.criar();
    }
  }
  criar(){
    this.ongService.insert(this.ongDTO)
    .subscribe(response => {
    this.showInsertOk();
    },
    error => {});
  }
  editar(){
    this.ongService.edit(this.ongDTO)
    .subscribe(response => {
    this.showInsertOk();
    },
    error => {});
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Salvo com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push("OngListagemPage");
          }
        }
      ]
    });
    alert.present();
  }
}
