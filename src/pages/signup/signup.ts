import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  //estados: EstadoDTO[];
  //cidades: CidadeDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        sexo : ['1', [Validators.required]],
        cpf : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        rg : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone : ['977261827', [Validators.required]],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]      
      });
  }

}
