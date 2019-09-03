import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalService } from '../../services/domain/animal.service';
import { RacaDTO } from '../../models/raca.dto';
import { AnimalDTO } from '../../models/animal.dto';
import { RacaService } from '../../services/domain/raca.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-animal-editar',
  templateUrl: 'animal-editar.html',
})
export class AnimalEditarPage {

  animalId: string;
  animal: FormGroup;
  item: AnimalDTO;
  racas: RacaDTO[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public animalService: AnimalService,
    public racaService: RacaService,
    public alertCtrl: AlertController) {

    this.animalId = this.navParams.get('animal_id');
    
    
           

      /*this.animal = this.formBuilder.group({
        nome: ['ar[0]', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        genero: ['1', [Validators.required]],
        porte: ['1', [Validators.required]],
        vermifugado: ['true', [Validators.required]],
        castrado: ['true', [Validators.required]],
        status: ['1', [Validators.required]],
        racaId: [null, [Validators.required]]
      });*/
  }

  ionViewDidLoad() {
    this.animalService.findById(this.animalId)
    .subscribe(response => {
      this.item = response;
      this.animal = this.formBuilder.group({
        nome: [this.item.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        genero: ['1', [Validators.required]],
        porte: ['1', [Validators.required]],
        vermifugado: ['true', [Validators.required]],
        castrado: ['true', [Validators.required]],
        status: ['1', [Validators.required]],
        racaId: [null, [Validators.required]]
      });
      
    },
    error => {});

    this.racaService.findAll()
    .subscribe(response => {
      this.racas = response;
      this.animal.controls.racaId.setValue(this.racas[0].id);
    },
      error => { });
  }

  editarAnimal() {
    this.animalService.editarAnimal(this.animal.value)
      .subscribe(response => {
        //this.showInsertOk();
        this.navCtrl.push('RacasPage');
      },
        error => { });
  }

}
