import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { VacinaDTO } from '../../models/vacina.dto';

@Injectable()
export class VacinaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<VacinaDTO[]>  {
        return this.http.get<VacinaDTO[]>(`${API_CONFIG.baseUrl}/vacinas`);
    }

    findAllByEspecie(especie : string) : Observable<VacinaDTO[]>  {
        return this.http.get<VacinaDTO[]>(`${API_CONFIG.baseUrl}/vacinas/especie/${especie}`);
    }

    insert(obj : VacinaDTO) {
        console.log(obj);
        return this.http.post(
            `${API_CONFIG.baseUrl}/vacinas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    vincular(obj : VacinaDTO) {
        console.log(obj);
        return this.http.post(
            `${API_CONFIG.baseUrl}/vacinas/vincular`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}