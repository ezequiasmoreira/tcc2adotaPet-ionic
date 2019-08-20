import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoencaCadastroPage } from './doenca-cadastro';

@NgModule({
  declarations: [
    DoencaCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(DoencaCadastroPage),
  ],
})
export class DoencaCadastroPageModule {}
