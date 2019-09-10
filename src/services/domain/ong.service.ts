import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { OngDTO } from "../../models/ong.dto";

@Injectable()
export class OngService {

    constructor(
        public http: HttpClient
        ) {
    }
    
    insert(obj : OngDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/ongs`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}