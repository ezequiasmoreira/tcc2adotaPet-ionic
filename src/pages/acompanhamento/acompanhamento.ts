import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';
import { AcompanhamentoDTO } from '../../models/Acompanhamento.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';
import { Camera,CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-acompanhamento',
  templateUrl: 'acompanhamento.html',
})
export class AcompanhamentoPage {

  animais : AnimalDTO[];
  cameraOn: boolean = false;
  picture: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public animalService: AnimalService,
    public acompanhamentoService: AcompanhamentoService,
    public camera: Camera
    ) {
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
      animal : animalId,
      imageUrl : this.picture
    }
    if (this.acompanhamentoService.validarCampos(acompanhamento) == true){
      acompanhamento.imageUrl = null;
      this.acompanhamentoService.insert(acompanhamento)
      .subscribe(response => {
        let acompanhamentoNovo : AcompanhamentoDTO = JSON.parse(response.body);
        this.sendPicture(acompanhamentoNovo.id);
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
  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture(id) {
    if(this.picture != undefined){
      this.acompanhamentoService.uploadPicture(this.picture, id)
      .subscribe(response => {
        this.picture = null;
      },
      error => {
      });
    }
  }
  cancel() {
    this.picture = null;
  }
}
