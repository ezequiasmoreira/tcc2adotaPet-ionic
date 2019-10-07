import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcompanhamentoService } from '../../services/domain/acompanhamento.service';
import { NEW_API_CONFIG } from '../../config/api.config';
import { AcompanhamentoDTO } from '../../models/acompanhamento.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-acompanhamento-detalhes',
  templateUrl: 'acompanhamento-detalhes.html',
})
export class AcompanhamentoDetalhesPage {

  item: AcompanhamentoDTO;
  formGroup: FormGroup;
  caminho : string;
  alterar : boolean = false;
  cameraOn: boolean = false;
  picture: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public alertCtrl: AlertController,
    public myApp: MyApp,
    public acompanhamentoService: AcompanhamentoService) {
      this.formGroup = this.formBuilder.group({
        id: ['', []],
        animal: ['', []],
        codigo: ['', [Validators.required]],
        descricao : ['', [Validators.required]],
        status : ['', [Validators.required]],
        situacao : ['',[Validators.required]],
        observacao : ['', []],
        dataAgendado : ['', []]      
      });
  }

  ionViewDidLoad() {
    let origem = this.navParams.get('origem');
    if(origem == 'usuario'){
      this.alterar = true;
    }else{
      this.alterar = false;
    }
    console.log("alterar"+this.alterar)
    let acompanhamento_id = this.navParams.get('acompanhamento_id');
    this.acompanhamentoService.getAcompanhamentoById(acompanhamento_id)
      .subscribe(response => {
        this.item = response;
        this.formGroup.controls.id.setValue(this.item.id);
        this.formGroup.controls.animal.setValue(this.item.animal);
        this.formGroup.controls.codigo.setValue(this.item.codigo);
        this.formGroup.controls.descricao.setValue(this.item.descricao);
        this.formGroup.controls.status.setValue(this.item.status);
        this.formGroup.controls.situacao.setValue(this.item.situacao);
        this.formGroup.controls.observacao.setValue(this.item.observacao);
        if (this.item.dataAgendado != null){
          this.formGroup.controls.dataAgendado.setValue(this.converterData(this.item.dataAgendado));
        }  
        if(this.item.descricao != undefined) {
          this.caminho = `${NEW_API_CONFIG.baseUrl}/acompanhamento/acomp${this.item.id}.jpg`;
        }      
        this.item = response; 
      },
      error => {});
  }
  converterData(data : string){ 
    let split = data.split('/');
    let dia = split[0];
    let mes = split[1];
    let ano = split[2];
    return ano + '-' + (mes) + '-' + dia;
  }
  converterDataBrasil(data : string){  
    let split = data.split('/');
    let ano = split[0];
    let mes = split[1];
    let dia = split[2];
    return dia + '/' + (mes) + '/' + ano;
  }
  salvar(){
    if(this.formGroup.value.dataAgendado != undefined){
      this.formGroup.value.dataAgendado =this.converterDataBrasil(this.formGroup.value.dataAgendado.replace(/-/g,'/'));
    }    
    this.acompanhamentoService.atualizaAcompanhamento(this.formGroup.value)
    .subscribe(response => {   
      let origem = this.navParams.get('origem');
      if(origem == 'usuario'){
        this.sendPicture(this.formGroup.value.id);
        this.myApp.iniciar();
        this.navCtrl.setRoot('AcompanhamentoSolicitadoPage')
      }else{
        this.navCtrl.setRoot("AcompanhamentoPesquisaPage");
      }
      
    },
    error => {
     this.erro(error)
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
  erro(errorObj) {
    let alert = this.alertCtrl.create({
        title: 'Não permitido',
        message: errorObj.message,
        enableBackdropDismiss: false,
        buttons: [
            {
                text: 'Ok'
            }
        ]
    });
    alert.present();  
  }

}
