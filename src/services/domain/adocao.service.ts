import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { AdocaolDTO } from "../../models/adocao.dto";

@Injectable()
export class AdocaoService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {
    }
    insert(animal_id : string) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/adocoes/` + animal_id,null,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    getAdocoesUser() : Observable<AdocaolDTO[]>  {
        return this.http.get<AdocaolDTO[]>(`${API_CONFIG.baseUrl}/adocoes`);
    }
    getAdocoesPorOng() : Observable<AdocaolDTO[]>  {
        return this.http.get<AdocaolDTO[]>(`${API_CONFIG.baseUrl}/adocoes/solicitacao`);
    }

}