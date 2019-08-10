import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

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

}