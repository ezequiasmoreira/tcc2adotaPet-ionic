import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaService } from '../../services/domain/pessoa.service';
import { PessoaDTO } from '../../models/pessoa.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { USUARIO_PERFIL } from '../../config/perfil';

/**
 * Generated class for the CadastrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastros',
  templateUrl: 'cadastros.html',
})
export class CadastrosPage {

  admin :string;
  master : string;
  voluntario : string;
  pessoa: PessoaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public pessoaService: PessoaService
    ) { }

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
  }

  cadastrarAnimal() {
    this.navCtrl.push('AnimalCadastroPage');    
  }

  cadastrarVacina(){
    this.navCtrl.push('VacinaCadastroPage');
  }
}
