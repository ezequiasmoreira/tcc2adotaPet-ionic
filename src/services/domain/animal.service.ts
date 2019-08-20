import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { AnimalDTO } from "../../models/animal.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AnimalService {

    constructor(public http: HttpClient) {
    }
    findById(produto_id : string) {
        return this.http.get<AnimalDTO>(`${API_CONFIG.baseUrl}/animais/${produto_id}`);
    }

    findAll() : Observable<AnimalDTO[]>  {
        return this.http.get<AnimalDTO[]>(`${API_CONFIG.baseUrl}/animais`);
    }

    findByRaca(raca_id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/animais/raca/${raca_id}`);
    }
    getSmallImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.imageBaseUrl}/animais/an${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    } 
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.imageBaseUrl}/animais/an${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    } 
    
    adicionaAnimal(obj : AnimalDTO) {
        console.log(obj);
        return this.http.post(
            `${API_CONFIG.baseUrl}/animal`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}