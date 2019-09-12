import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OngListagemPage } from './ong-listagem';

@NgModule({
  declarations: [
    OngListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(OngListagemPage),
  ],
})
export class OngListagemPageModule {}
