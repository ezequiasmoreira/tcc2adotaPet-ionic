import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { AnimalDTO } from "../../models/animal.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AnimalService {

    constructor(public http: HttpClient) {
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
}