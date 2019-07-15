import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimaisPage } from './animais';

@NgModule({
  declarations: [
    AnimaisPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimaisPage),
  ],
})
export class AnimaisPageModule {}
