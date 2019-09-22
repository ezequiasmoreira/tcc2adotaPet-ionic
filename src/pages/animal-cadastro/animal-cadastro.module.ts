import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalCadastroPage } from './animal-cadastro';
import { RacaService } from '../../services/domain/raca.service';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    AnimalCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalCadastroPage),
  ],
  providers: [
    RacaService,
    Camera
  ]
})
export class AnimalCadastroPageModule {}
