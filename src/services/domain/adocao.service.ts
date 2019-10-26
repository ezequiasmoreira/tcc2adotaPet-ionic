import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
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
    obterAdocoesConcluida() : Observable<AdocaolDTO[]>  {
        return this.http.get<AdocaolDTO[]>(`${API_CONFIG.baseUrl}/adocoes/concluida`);
    }
    getAdocoesPorOng() : Observable<AdocaolDTO[]>  {
        return this.http.get<AdocaolDTO[]>(`${API_CONFIG.baseUrl}/adocoes/solicitacao`);
    }
    getAdocaoById(adocao_id : string){
        return this.http.get<AdocaolDTO>(`${API_CONFIG.baseUrl}/adocoes/${adocao_id}`);
    }
    atualizaAdocao(adocao){
        console.log(adocao);
        return this.http.put(
            `${API_CONFIG.baseUrl}/adocoes/${adocao.id}`  ,
            adocao,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    pesquisar(parametros){
        parametros.codigo = parametros.codigo > 0 ? parametros.codigo : 0;
        parametros.status = parametros.status > 0 ? parametros.status : 0; 
        return this.http.get<AdocaolDTO[]>(`${API_CONFIG.baseUrl}/adocoes/pesquisar?codigo=${parametros.codigo}&status=${parametros.status}&periodoInical=${parametros.periodoInical}&periodoFinal=${parametros.periodoFinal}`);
    }
}