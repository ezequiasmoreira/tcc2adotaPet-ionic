import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VacinaService } from '../../services/domain/vacina.service';


@IonicPage()
@Component({
  selector: 'page-vacina-cadastro',
  templateUrl: 'vacina-cadastro.html',
})
export class VacinaCadastroPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public vacinaService: VacinaService) {

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        faixaIdade : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        prevencao : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        especie : ['1', [Validators.required]]    
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VacinaCadastroPage');
  }

  addVacina(){
    this.vacinaService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
      this.navCtrl.push('RacasPage');
    },
    error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Vacina cadastrada com sucesso',
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
