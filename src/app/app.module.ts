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
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { AnimalService } from '../services/domain/animal.service';
import { ImageUtilService } from '../services/image-util.service';
import { AdocaoService } from '../services/domain/adocao.service';
import { VacinaService } from '../services/domain/vacina.service';

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
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    PessoaService,
    AnimalService,
    ImageUtilService,
    AdocaoService,
    VacinaService,
    AnimalService
  ]
})
export class AppModule {}
