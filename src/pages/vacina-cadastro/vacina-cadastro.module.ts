import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacinaCadastroPage } from './vacina-cadastro';

@NgModule({
  declarations: [
    VacinaCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(VacinaCadastroPage),
  ],
})
export class VacinaCadastroPageModule {}
