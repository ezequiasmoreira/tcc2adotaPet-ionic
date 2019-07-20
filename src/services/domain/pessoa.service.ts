import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { PessoaDTO } from "../../models/pessoa.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class PessoaService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail(email: string) : Observable<PessoaDTO> {

        return this.http.get<PessoaDTO>(`${API_CONFIG.baseUrl}/pessoas/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.imageBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
    insert(obj : PessoaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pessoas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}