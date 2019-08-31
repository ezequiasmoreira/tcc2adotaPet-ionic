import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AdocaolDTO } from '../../models/adocao.dto';
import { AdocaoService } from '../../services/domain/adocao.service';



@IonicPage()
@Component({
  selector: 'page-adocoes-painel',
  templateUrl: 'adocoes-painel.html',
})
export class AdocoesPainelPage {

  item : AdocaolDTO;
  caminho : string;
  habilita : boolean = false;
  periodoInical : string;
  periodoFinal : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public adocaoService: AdocaoService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
  }
  pesquisar(codigo,status,periodoInical,periodoFinal){
    let parametros = {
      "codigo" : codigo,
      "status" : status,
      "periodoInical" : periodoInical,
      "periodoFinal" : periodoFinal
    }
    if(this.validarData(periodoInical,periodoFinal)==true){
      this.navCtrl.push('AdocoesSolicitacaoPage',{parametros : parametros});  
    }
    return true;
  }
  validarData(periodoInical : string,periodoFinal :string){
    if( (periodoFinal==undefined) || (periodoInical==undefined)){
      let alert = this.alertCtrl.create({
        title: 'Período inválido!',
        message: 'Infomar período inválido',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present();
      return false;
    }
    return true;
  }
  
 

}
