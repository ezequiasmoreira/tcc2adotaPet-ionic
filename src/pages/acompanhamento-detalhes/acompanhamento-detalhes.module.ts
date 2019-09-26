import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcompanhamentoDetalhesPage } from './acompanhamento-detalhes';

@NgModule({
  declarations: [
    AcompanhamentoDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(AcompanhamentoDetalhesPage),
  ],
})
export class AcompanhamentoDetalhesPageModule {}
