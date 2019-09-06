import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacinaEditarPage } from './vacina-editar';

@NgModule({
  declarations: [
    VacinaEditarPage,
  ],
  imports: [
    IonicPageModule.forChild(VacinaEditarPage),
  ],
})
export class VacinaEditarPageModule {}
