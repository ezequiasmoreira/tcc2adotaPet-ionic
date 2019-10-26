import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';
import { NEW_API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-animais',
  templateUrl: 'animais.html',
})
export class AnimaisPage {

  items : AnimalDTO[];
  origem : string = 'animais';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public animalService: AnimalService
    ) {
  }

  ionViewDidLoad() {
    let raca_id = this.navParams.get('raca_id');
    let parametros = this.navParams.get('parametros');
    let origem = this.navParams.get('origem');
    if (origem == undefined) {
      this.animalService.findByRaca(raca_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
      error => {});
    }
    if (origem == 'homefiltro'){
      this.items = parametros;
      this.loadImageUrls();
    }
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      item.imageUrl = `${NEW_API_CONFIG.baseUrl}/animal/an${item.id}.jpg`;
      
    }    
  }  

  showDetail(animal_id : string) {
    this.navCtrl.push('AnimalDetailPage', {animal_id: animal_id});
  }

}
