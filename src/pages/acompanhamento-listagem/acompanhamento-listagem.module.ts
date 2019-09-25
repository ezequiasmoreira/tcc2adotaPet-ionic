import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcompanhamentoListagemPage } from './acompanhamento-listagem';

@NgModule({
  declarations: [
    AcompanhamentoListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(AcompanhamentoListagemPage),
  ],
})
export class AcompanhamentoListagemPageModule {}
