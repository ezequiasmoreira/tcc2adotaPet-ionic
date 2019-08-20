import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { VacinaDTO } from '../../models/vacina.dto';

@Injectable()
export class VacinaService {

    constructor(public http: HttpClient) {
    }

    findAll(estado_id : string) : Observable<VacinaDTO[]>  {
        return this.http.get<VacinaDTO[]>(`${API_CONFIG.baseUrl}/vacinas`);
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
}