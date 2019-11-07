import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { PessoaDTO } from '../../models/pessoa.dto';
import { PessoaService } from '../../services/domain/pessoa.service';
import { API_CONFIG, NEW_API_CONFIG } from '../../config/api.config';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  pessoa: PessoaDTO;
  picture: string;
  profileImage;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public pessoaService: PessoaService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.pessoaService.findByEmail(localUser.email)
        .subscribe(response => {
          this.pessoa = response;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }else{
      this.navCtrl.setRoot('HomePage'); 
    }
  }
  getImageIfExists() {
    this.pessoaService.validarImagem()
    .subscribe(response => {
      this.pessoa.imageUrl = `${NEW_API_CONFIG.baseUrl}/pessoa/cp${this.pessoa.id}.jpg`;    
    },
    error => {
      this.pessoa.imageUrl = `${NEW_API_CONFIG.baseUrl}/pessoa/no-image.jpg`;
    });  
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
  sendPicture() {
    this.pessoaService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
        this.navCtrl.setRoot('ProfilePage'); 
      },
      error => {
      });
  }

  cancel() {
    this.picture = null;
  }
  editar(){
    this.navCtrl.push('SignupPage',{origem : true}); 
  }
}