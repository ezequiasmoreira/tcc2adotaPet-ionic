import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalService } from '../../services/domain/animal.service';
import { RacaDTO } from '../../models/raca.dto';
import { AnimalDTO } from '../../models/animal.dto';
import { RacaService } from '../../services/domain/raca.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera,CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-animal-cadastro',
  templateUrl: 'animal-cadastro.html',
})
export class AnimalCadastroPage {

  formGroup: FormGroup;
  racas: RacaDTO[];
  cameraOn: boolean = false;
  picture: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public animalService: AnimalService,
    public racaService: RacaService,
    public alertCtrl: AlertController,
    public camera: Camera
  ) {
      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        genero: ['1', [Validators.required]],
        porte: ['1', [Validators.required]],
        vermifugado: ['true', [Validators.required]],
        castrado: ['true', [Validators.required]],
        status: ['1', [Validators.required]],
        racaId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.racaService.findAll()
      .subscribe(response => {
        this.racas = response;
        this.formGroup.controls.racaId.setValue(this.racas[0].id);
      },
        error => { });
  }

  addAnimal() {
    this.animalService.adicionaAnimal(this.formGroup.value)
      .subscribe(response => {
        console.log(response.body);
        let animalNovo : AnimalDTO = JSON.parse(response.body);
        this.sendPicture(animalNovo.id);
        this.showInsertOk();
        
      },
        error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Animal cadastrado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('RacasPage');
          }
        }
      ]
    });
    alert.present();
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
      this.animalService.uploadPicture(this.picture, id)
      .subscribe(response => {
        this.picture = null;
      },
      error => {
      });
    }
  }

}
