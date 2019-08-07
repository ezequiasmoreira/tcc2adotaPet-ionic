import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-animal-detail',
  templateUrl: 'animal-detail.html',
})
export class AnimalDetailPage {

   item: AnimalDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public animalService: AnimalService) {
  }

  ionViewDidLoad() {
    let animal_id = this.navParams.get('animal_id');
    this.animalService.findById(animal_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.animalService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.imageBaseUrl}/animais/an${this.item.id}.jpg`;
      },
      error => {});
  }
  adotar(animal_id : string) {
    this.navCtrl.push('AdocoesPage',{animal_id : animal_id});    
  }
}

