import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalService } from '../../services/domain/animal.service';
import { RacaDTO } from '../../models/raca.dto';
import { RacaService } from '../../services/domain/raca.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-animal-cadastro',
  templateUrl: 'animal-cadastro.html',
})
export class AnimalCadastroPage {

  formGroup: FormGroup;
  racas: RacaDTO[];
  animalId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public animalService: AnimalService,
    public racaService: RacaService,
    public alertCtrl: AlertController
  ) {
    this.animalId = this.navParams.get('animal_id');

    if(this.animalId == null){
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
    else{
      this.animalService.findById(this.animalId)
      .subscribe(response => {
        this.formGroup = this.formBuilder.group({
          nome: [response.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
          genero: [response.genero, [Validators.required]],
          porte: [response.porte, [Validators.required]],
          vermifugado: [response.vermifugado, [Validators.required]],
          castrado: [response.castrado, [Validators.required]],
          status: [response.status, [Validators.required]],
          racaId: [response.racaId, [Validators.required]]
        });
      },
        error => { });
    }
    
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
        this.showInsertOk();
        this.navCtrl.push('RacasPage');
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
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
