import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalEditarPage } from './animal-editar';
import { RacaService } from '../../services/domain/raca.service';

@NgModule({
  declarations: [
    AnimalEditarPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalEditarPage),
  ],
  providers: [
    RacaService    
  ]
})
export class AnimalEditarPageModule {}
