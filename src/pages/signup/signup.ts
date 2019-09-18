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
  editar : boolean = false;
  

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
        id: ['', []],
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
    this.editar = this.navParams.get('origem');   
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
            if (this.editar == true){
              this.popularTela(this.pessoa,localUser.email);
            }                                         
        },
        error => { });
    }    
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        if (!this.editar == true){
          this.formGroup.controls.estadoId.setValue(this.pessoa.estadoId);
        }
        this.updateCidades(this.pessoa.cidadeId);
        
      },
      error => {});
    this.ongService.findAll()
    .subscribe(response => {
      this.ongs = response;     
    },
    error => {});   
  }

  updateCidades(cidadeId : string) {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        if (!this.editar == true){
          this.formGroup.controls.cidadeId.setValue(cidadeId);
        }
      },
      error => {});
  }

  signupUser() {    
    this.pessoaNew = this.formGroup.value;
    if (this.master == USUARIO_PERFIL.MASTER){
      this.pessoaNew.ongId = this.ongId;
    }
    if (this.editar == true){         
      this.pessoaService.update(this.formGroup.value)
      .subscribe(response => {
        console.log(this.formGroup.value);
        this.showUpadateOk();
      },
      error => {});        
    }else{      
      this.pessoaService.insert(this.pessoaNew)
        .subscribe(response => {
          this.showInsertOk();
        },
        error => {});
      }
  }
  popularTela(pessoa : PessoaDTO,email : string){    
    this.formGroup.controls.id.setValue(pessoa.id);
    this.formGroup.controls.nome.setValue(pessoa.nome);
    this.formGroup.controls.email.setValue(email);
    this.formGroup.controls.sexo.setValue(pessoa.sexo);
    this.formGroup.controls.cpf.setValue(pessoa.cpf);
    this.formGroup.controls.rg.setValue(pessoa.rg);
    this.formGroup.controls.logradouro.setValue(pessoa.logradouro);
    this.formGroup.controls.numero.setValue(pessoa.numero);
    this.formGroup.controls.complemento.setValue(pessoa.complemento);
    this.formGroup.controls.bairro.setValue(pessoa.bairro);
    this.formGroup.controls.cep.setValue(pessoa.cep);
    this.formGroup.controls.telefone.setValue(pessoa.telefone);
    this.formGroup.controls.estadoId.setValue(pessoa.estadoId);
    this.formGroup.controls.cidadeId.setValue(pessoa.cidadeId);
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
  showUpadateOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Atualizado com sucesso',
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
