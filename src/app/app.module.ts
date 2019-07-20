import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RacaService } from '../services/domain/raca.service';
import { ErrorInterceptorProvider } from '../interceptors/ErrorInterceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { PessoaService } from '../services/domain/pessoa.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RacaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    PessoaService
  ]
})
export class AppModule {}
