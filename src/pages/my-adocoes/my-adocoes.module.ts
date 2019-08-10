import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAdocoesPage } from './my-adocoes';

@NgModule({
  declarations: [
    MyAdocoesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAdocoesPage),
  ],
})
export class MyAdocoesPageModule {}
