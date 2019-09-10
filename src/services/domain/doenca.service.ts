import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { DoencaDTO } from '../../models/doenca.dto';

@Injectable()
export class DoencaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<DoencaDTO[]>  {
        return this.http.get<DoencaDTO[]>(`${API_CONFIG.baseUrl}/doencas`);
    }

    insert(obj : DoencaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/doencas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}