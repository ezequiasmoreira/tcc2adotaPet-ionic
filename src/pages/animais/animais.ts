import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-animais',
  templateUrl: 'animais.html',
})
export class AnimaisPage {

  items : AnimalDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public animalService: AnimalService
    ) {
  }

  ionViewDidLoad() {
    let raca_id = this.navParams.get('raca_id');
    this.animalService.findByRaca(raca_id)
    .subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
    },
    error => {});
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.animalService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.imageBaseUrl}/animais/an${item.id}.jpg`;
        },
        error => {});
    }    
  }  

  showDetail(animal_id : string) {
    this.navCtrl.push('AnimalDetailPage', {animal_id: animal_id});
  }

}
