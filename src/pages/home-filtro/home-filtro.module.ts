import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeFiltroPage } from './home-filtro';

@NgModule({
  declarations: [
    HomeFiltroPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeFiltroPage),
  ],
})
export class HomeFiltroPageModule {}
