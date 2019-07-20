import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { PessoaDTO } from '../../models/pessoa.dto';
import { PessoaService } from '../../services/domain/pessoa.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  pessoa: PessoaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public pessoaService: PessoaService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.pessoaService.findByEmail(localUser.email)
        .subscribe(response => {
          this.pessoa = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }
  getImageIfExists() {
    this.pessoaService.getImageFromBucket(this.pessoa.id)
    .subscribe(response => {
      this.pessoa.imageUrl = `${API_CONFIG.imageBaseUrl}/cp${this.pessoa.id}.jpg`;
    },
    error => {});
  }
}