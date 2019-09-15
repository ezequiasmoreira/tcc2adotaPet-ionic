import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { VacinaService } from '../../services/domain/vacina.service';
import { VacinaDTO } from '../../models/vacina.dto';


@IonicPage()
@Component({
  selector: 'page-vacina-vincular',
  templateUrl: 'vacina-vincular.html',
})
export class VacinaVincularPage {

  vacinas : VacinaDTO[];
  animalId: string;
  animalEspecie: string;
  nome: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public vacinaService: VacinaService,
    public alertCtrl: AlertController,) {
      this.animalId = this.navParams.get('animal_id');
      this.animalEspecie = this.navParams.get('animalEspecie');
      this.nome = this.navParams.get('animal_nome');
  }

  ionViewDidLoad() {
    this.vacinaService.findAllByEspecie(this.animalEspecie)
    .subscribe(response => {
      this.vacinas = response;
      
    },
    error => {});
  }

  vincularVacina(id){
    let vacinaById = this.vacinas.find(x => x.id == id);
    let vacina : VacinaDTO = {
      id : id,
      especie : vacinaById.especie,
      faixaIdade : vacinaById.faixaIdade,
      nome : vacinaById.nome,
      prevencao : vacinaById.prevencao,
      animalId : this.animalId
    }
    console.log(vacina);
    this.vacinaService.vincular(vacina)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }
  
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Vacina vinculada com sucesso',
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
