import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitarAcompanhamentoPage } from './solicitar-acompanhamento';

@NgModule({
  declarations: [
    SolicitarAcompanhamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitarAcompanhamentoPage),
  ],
})
export class SolicitarAcompanhamentoPageModule {}
