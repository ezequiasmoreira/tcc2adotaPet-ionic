import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RacasPage } from './racas';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RacasPage,
  ],
  imports: [
    IonicPageModule.forChild(RacasPage),
    PipesModule
  ],
})
export class RacasPageModule {}
