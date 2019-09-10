import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { PessoaService } from '../../services/domain/pessoa.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { OngService } from '../../services/domain/ong.service';

@IonicPage()
@Component({
  selector: 'page-ong-cadastro',
  templateUrl: 'ong-cadastro.html',
})
export class OngCadastroPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public ongService: OngService,
    public alertCtrl: AlertController
    ) {
      this.formGroup = this.formBuilder.group({
        razao_Social: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        nome_Fantasia: ['', [Validators.required]],
        cnpj : ['', [Validators.minLength(11), Validators.maxLength(14)]],       
        logradouro : ['', []],
        numero : ['', []],
        complemento : ['',[]],
        bairro : ['', []],
        cep : ['', [Validators.required]],
        telefone : ['',[]],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]      
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }
  salvar() {
    this.ongService.insert(this.formGroup.value)
      .subscribe(response => {
       this.showInsertOk();
      },
      error => {});
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
