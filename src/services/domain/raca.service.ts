import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RacaDTO } from "../../models/raca.dto";
import { Observable } from "rxjs";

@Injectable()
export class RacaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<RacaDTO[]>  {
        return this.http.get<RacaDTO[]>(`${API_CONFIG.baseUrl}/racas`);
    }

    insert(obj : RacaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/racas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}