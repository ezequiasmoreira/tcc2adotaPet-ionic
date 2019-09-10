import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OngCadastroPage } from './ong-cadastro';

@NgModule({
  declarations: [
    OngCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(OngCadastroPage),
  ],
})
export class OngCadastroPageModule {}
