import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { PessoaDTO } from "../../models/pessoa.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class PessoaService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imageUtilService: ImageUtilService
        ) {
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
    update(obj : PessoaDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/pessoas/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.append('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/pessoas/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}