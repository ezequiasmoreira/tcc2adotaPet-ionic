import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalCadastroPage } from './animal-cadastro';
import { RacaService } from '../../services/domain/raca.service';

@NgModule({
  declarations: [
    AnimalCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalCadastroPage),
  ],
  providers: [
    RacaService    
  ]
})
export class AnimalCadastroPageModule {}
