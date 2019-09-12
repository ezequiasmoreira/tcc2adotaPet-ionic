import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OngService } from '../../services/domain/ong.service';
import { OngDTO } from '../../models/ong.dto';


@IonicPage()
@Component({
  selector: 'page-ong-listagem',
  templateUrl: 'ong-listagem.html',
})
export class OngListagemPage {
  
  items : OngDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ongService : OngService) {
  }

  ionViewDidLoad() {
    this.ongService.findAll()      
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }
  editar(ong : OngDTO){
    this.navCtrl.push('OngCadastroPage',{ong : ong, origem : 'editar'});  
  }

}
