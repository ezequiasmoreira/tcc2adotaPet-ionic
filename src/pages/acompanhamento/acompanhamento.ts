import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';
import { AcompanhamentoDTO } from '../../models/Acompanhamento.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';

@IonicPage()
@Component({
  selector: 'page-acompanhamento',
  templateUrl: 'acompanhamento.html',
})
export class AcompanhamentoPage {

  animais : AnimalDTO[];
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public animalService: AnimalService,
    public acompanhamentoService: AcompanhamentoService) {
  }

  ionViewDidLoad() {
    this.animalService.findAll("0")
    .subscribe(response => {
      this.animais = response;      
    },
    error => {});
  }
  cadastrar(descricao,observacao,dataAgendado,status,situacao,animalId){
    let acompanhamento : AcompanhamentoDTO = {
      descricao : descricao,
      observacao : observacao,
      dataAgendado : dataAgendado,
      status : status,
      situacao : situacao,
      animal : animalId
    }
    if (this.acompanhamentoService.validarCampos(acompanhamento) == true){
      this.acompanhamentoService.insert(acompanhamento)
      .subscribe(response => {
        this.showInsertOk(acompanhamento.animal);
      },
      error => {});
    }    
  }
  showInsertOk(animal) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Acompanhamento cadastrado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push('AnimalDetailPage', {animal_id: animal});
          }
        }
      ]
    });
    alert.present();
  }
  pesquisar(){
    
  }



}
