import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../../services/storage.service';
import { PessoaService } from '../../services/domain/pessoa.service';
import { PessoaDTO } from '../../models/pessoa.dto';
import { USUARIO_PERFIL } from '../../config/perfil';

@IonicPage()
@Component({
  selector: 'page-animal-detail',
  templateUrl: 'animal-detail.html',
})
export class AnimalDetailPage {

   item: AnimalDTO;
   habilita : boolean = true;
   pessoa: PessoaDTO;
   admin :string;
   master : string;
   voluntario : string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public pessoaService: PessoaService,
    public animalService: AnimalService) {
  }

  ionViewDidLoad() {
    let animal_id = this.navParams.get('animal_id');
    if (this.navParams.get('habilita') == "false") {
        this.habilita = false;
    }
    this.animalService.findById(animal_id)
      .subscribe(response => {
        this.item = response;

        this.getImageUrlIfExists();
      },
      error => {});

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

  getImageUrlIfExists() {
    this.animalService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.imageBaseUrl}/animais/an${this.item.id}.jpg`;
      },
      error => {});
  }
  
  adotar(animal_id : string) {
    this.navCtrl.push('AdocoesPage',{animal_id : animal_id});    
  }

  editar(animal_id : string) {
    this.navCtrl.push('AnimalEditarPage',{animal_id : animal_id});    
  }

  addDoenca(animal_id : string,
     animal_nome: string) {
    this.navCtrl.push('DoencaCadastroPage',{animal_id : animal_id, 
      animal_nome : animal_nome});    
  }

  vincularVacina(animal_id : string,animal_nome: string, 
    animalEspecie: string) {
    this.navCtrl.push('VacinaVincularPage',{animal_id : animal_id, 
      animal_nome : animal_nome, 
      animalEspecie : animalEspecie});    
  }
}

