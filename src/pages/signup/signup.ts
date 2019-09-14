import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { PessoaService } from '../../services/domain/pessoa.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PessoaDTO } from '../../models/pessoa.dto';
import { StorageService } from '../../services/storage.service';
import { USUARIO_PERFIL } from '../../config/perfil';
import { OngDTO } from '../../models/ong.dto';
import { OngService } from '../../services/domain/ong.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  ongs: OngDTO[];
  pessoa: PessoaDTO;
  pessoaNew: PessoaDTO;
  ongId: string;
  admin :string;
  master : string;
  voluntario : string;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public pessoaService: PessoaService,
    public ongService: OngService,
    public storage: StorageService,
    public alertCtrl: AlertController
    ) {
      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        sexo : ['1', [Validators.required]],
        cpf : ['', [Validators.minLength(11), Validators.maxLength(14)]],
        rg : ['', [Validators.minLength(7), Validators.maxLength(20)]],
        senha : ['', [Validators.required]],
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
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.pessoaService.findByEmail(localUser.email)
        .subscribe(response => {
            this.pessoa =  response; 
            if(this.pessoa.perfil == USUARIO_PERFIL.ADMIN){
              this.admin = this.pessoa.perfil;
            }
            if(this.pessoa.perfil == USUARIO_PERFIL.MASTER){
              this.master = this.pessoa.perfil;
            }
            if(this.pessoa.perfil == USUARIO_PERFIL.VOLUNTARIO){
              this.voluntario = this.pessoa.perfil;
            }                                          
        },
        error => { });
    }    
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
    this.ongService.findAll()
    .subscribe(response => {
      this.ongs = response;     
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

  signupUser() {    
    this.pessoaNew = this.formGroup.value;
    if (this.master == USUARIO_PERFIL.MASTER){
      this.pessoaNew.ongId = this.ongId;
    }
    console.log(this.pessoaNew);
    this.pessoaService.insert(this.pessoaNew)
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
            if (this.master == USUARIO_PERFIL.MASTER){
              this.navCtrl.setRoot("SignupPage");
            }else{
              this.navCtrl.pop();
            }
            
          }
        }
      ]
    });
    alert.present();
  }
  updateOng(ongId){
    this.ongId = ongId;
  }

}
