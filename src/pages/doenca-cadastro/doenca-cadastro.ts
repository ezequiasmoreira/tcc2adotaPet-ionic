import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DoencaService } from '../../services/domain/doenca.service';


@IonicPage()
@Component({
  selector: 'page-doenca-cadastro',
  templateUrl: 'doenca-cadastro.html',
})
export class DoencaCadastroPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public doencaService: DoencaService,
    public alertCtrl: AlertController,
  ) {
    this.formGroup = this.formBuilder.group({
      descricao : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoencaCadastroPage');
  }

  addDoenca(){
    this.doencaService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
      this.navCtrl.push('RacasPage');
    },
    error => {});
  }

  
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Doença cadastrada com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


}
