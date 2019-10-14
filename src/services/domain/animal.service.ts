import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG, NEW_API_CONFIG } from '../../config/api.config';
import { AnimalDTO } from "../../models/animal.dto";
import { Observable } from "rxjs";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class AnimalService {

    constructor(public http: HttpClient, public imageUtilService: ImageUtilService) {
    } 
    findById(animal_id : string) {
        return this.http.get<AnimalDTO>(`${API_CONFIG.baseUrl}/animais/${animal_id}`);
    }

    findAll(ong_id : string) : Observable<AnimalDTO[]>  {
        return this.http.get<AnimalDTO[]>(`${API_CONFIG.baseUrl}/animais/ong/${ong_id}`);
    }

    findByRaca(raca_id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/animais/raca/${raca_id}`);
    }
    findByFilter(parametros) { 
        return this.http.get<AnimalDTO[]>(
            `${API_CONFIG.baseUrl}/animais/pesquisar?nome=${parametros.nome}&genero=${parametros.genero}&porte=${parametros.porte}&castrado=${parametros.castrado}&estadoId=${parametros.estadoId}&cidadeId=${parametros.cidadeId}&racaId=${parametros.racaId}`);
    }
    
    adicionaAnimal(obj : AnimalDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/animais`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    editarAnimal(obj) {
        console.log(obj);
        return this.http.put(
            `${API_CONFIG.baseUrl}/animais/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    uploadPicture(picture, id) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.append('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/animais/picture/${id}`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}