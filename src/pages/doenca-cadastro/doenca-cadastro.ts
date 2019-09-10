import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AnimalService } from '../../services/domain/animal.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DoencaService } from '../../services/domain/doenca.service';
import { DoencaDTO } from '../../models/doenca.dto';


@IonicPage()
@Component({
  selector: 'page-doenca-cadastro',
  templateUrl: 'doenca-cadastro.html',
})
export class DoencaCadastroPage {

  doencas : DoencaDTO[];
  animalId: string;
  nome: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public animalService: AnimalService,
    public doencaService: DoencaService,
    public alertCtrl: AlertController,
  ) {
    this.animalId = this.navParams.get('animal_id');
  }

  ionViewDidLoad() {
    this.doencaService.findAll()
    .subscribe(response => {
      this.doencas = response;
    },
    error => {});

    this.animalService.findById(this.animalId)
    .subscribe(response => {
      this.nome = response.nome;
    },
    error => {});
  }

  addDoenca(id){
    let doencaById = this.doencas.find(x => x.id == id);
    let doenca : DoencaDTO = {
      id : id,
      codigo : doencaById.codigo,
      descricao : doencaById.descricao,
      animal : this.animalId
    }

    this.doencaService.insert(doenca)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }
  
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Doença vinculada com sucesso',
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
