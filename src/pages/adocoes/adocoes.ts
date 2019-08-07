import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalService } from '../../services/domain/animal.service';
import { AnimalDTO } from '../../models/animal.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-adocoes',
  templateUrl: 'adocoes.html',
})
export class AdocoesPage {

  animal: AnimalDTO;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public animalService: AnimalService) {
  }
  
  ionViewDidLoad() {
    let animal_id = this.navParams.get('animal_id');
    this.animalService.findById(animal_id)
      .subscribe(response => {
        this.animal = response;
        console.log(this.animal)
        this.getImageUrlIfExists();
      },
      error => {});
  }
  getImageUrlIfExists() {
    this.animalService.getImageFromBucket(this.animal.id)
      .subscribe(response => {
        this.animal.imageUrl = `${API_CONFIG.imageBaseUrl}/animais/an${this.animal.id}.jpg`;
      },
      error => {});
  }

}
