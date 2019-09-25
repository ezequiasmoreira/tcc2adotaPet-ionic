import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AcompanhamentoDTO } from "../../models/acompanhamento.dto";


@Injectable()
export class AcompanhamentoService {

    constructor(
        public http: HttpClient,
        public alertCtrl: AlertController) {
    }
    insert(obj : AcompanhamentoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/acompanhamentos`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    validarCampos(acompanhamentoDTO : AcompanhamentoDTO){
        let mensagem = "";
    
        for (var campo in acompanhamentoDTO){
          if (acompanhamentoDTO[campo] == undefined){
            if (campo == "descricao"){
              campo = "descrição";
            } 
            if(campo == "observacao"){
              campo = "observação";
            }        
            if(campo == "situacao"){
              campo = "situação";
            }
            if(campo == "dataAgendado"){
              campo = "";
            }
            mensagem += (campo != "") ? campo+"," : "";
          }
          console.log(campo + " = " + acompanhamentoDTO[campo]);
        }
    
        if (mensagem != ""){
          let alert = this.alertCtrl.create({
            title: 'Campo não preenchido',
            message: 'Possui campos não preenchidos:<b> '+mensagem.substr(0,(mensagem.length - 1))+"</b>",
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
    findByFilter(parametros) { 
      return this.http.get<AcompanhamentoDTO[]>(
          `${API_CONFIG.baseUrl}/acompanhamentos/pesquisar?status=${parametros.status}&animalId=${parametros.animalId}`);
    }
}