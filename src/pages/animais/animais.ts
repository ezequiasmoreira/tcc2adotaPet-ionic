import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimalDTO } from '../../models/animal.dto';
import { AnimalService } from '../../services/domain/animal.service';

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
    },
    error => {});
  }

}
