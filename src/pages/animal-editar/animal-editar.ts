import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalService } from '../../services/domain/animal.service';
import { RacaDTO } from '../../models/raca.dto';
import { AnimalDTO } from '../../models/animal.dto';
import { RacaService } from '../../services/domain/raca.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-animal-editar',
  templateUrl: 'animal-editar.html',
})
export class AnimalEditarPage {

  animalId: string;
  nome: string;
  codigo: string;
  genero : string;
  porte : string;	
  vacinado : string;
  vermifugado : string;
  castrado : string;
  ongId? :	string;
  status : string;
  racaId :string;
  cidade : string;
  imageUrl? : string;
  racas: RacaDTO[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public animalService: AnimalService,
    public racaService: RacaService,
    public alertCtrl: AlertController) {

    this.animalId = this.navParams.get('animal_id');
   
  }

  ionViewDidLoad() {
    this.animalService.findById(this.animalId)
    .subscribe(response => {
      console.log(response);
      this.nome = response.nome;
      this.codigo = response.codigo;
      this.genero = response.genero;
      this.porte = response.porte;
      this.vacinado = response.vacinado;
      this.vermifugado = response.vermifugado;
      this.castrado = response.castrado;
      this.ongId = response.ongId;
      this.status = response.status;
      this.cidade = response.cidade;
      this.racaId = response.raca.id;
      this.imageUrl = response.imageUrl;
    },
    error => {});

    this.racaService.findAll()
    .subscribe(response => {
      this.racas = response;
    },
      error => { });
  }

  editarAnimal(nome, porte, genero, vacinado,vermifugado, castrado, racaId) {
    console.log(nome);
    let animal = {
      id : this.animalId,
      nome : nome,
      codigo : this.codigo,
      genero : genero,
      porte : porte,
      vermifugado : vermifugado,
      castrado : castrado,
      status : status,
      racaId : racaId      
    }
    console.log(animal);
    this.animalService.editarAnimal(animal)
      .subscribe(response => {
        //this.showInsertOk();
        this.navCtrl.push('RacasPage');
      },
        error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Animal atualizado',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push('AnimalDetailPage', {animal_id: this.animalId});
          }
        }
      ]
    });
    alert.present();
  }

}
