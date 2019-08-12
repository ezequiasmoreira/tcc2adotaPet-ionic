import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { PessoaService } from '../services/domain/pessoa.service';
import { PessoaDTO } from '../models/pessoa.dto';
import { USUARIO_PERFIL } from '../config/perfil';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';
  perfil :string;
  pessoa: PessoaDTO;

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public storage: StorageService,
    public pessoaService: PessoaService
    ) {
    this.iniciar();
    this.initializeApp();    
  }
  
  iniciar() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.pessoaService.findByEmail(localUser.email)
        .subscribe(response => {
          this.pessoa = response;
          this.isAuthorized(this.pessoa.perfil);
          console.log(this.pessoa);
        },
        error => { });
    }
  }
  isAuthorized(perfil :string){
    if ( perfil == USUARIO_PERFIL.USUARIO ){
      this.pages = [
        { title: 'Perfil', component: 'ProfilePage' },
        { title: 'Raças', component: 'RacasPage' },
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Sair', component: ''}
      ];
    }else if(perfil == USUARIO_PERFIL.VOLUNTARIO){
      this.pages = [
        { title: 'Perfil', component: 'ProfilePage' },
        { title: 'Raças', component: 'RacasPage' },
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage' },
        { title: 'Cadastros', component: 'CadastrosPage' },
        { title: 'Sair', component: ''}
      ];    
    }else if(perfil == USUARIO_PERFIL.ADMIN){
      this.pages = [
        { title: 'Perfil', component: 'ProfilePage' },
        { title: 'Raças', component: 'RacasPage' },
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage' },
        { title: 'Cadastros', component: 'CadastrosPage' },
        { title: 'Adoções', component: 'RacasPage' },
        { title: 'Sair', component: ''}
      ];    
    }else if(perfil == USUARIO_PERFIL.MASTER){
      this.pages = [
        { title: 'Perfil', component: 'ProfilePage' },
        { title: 'Raças', component: 'RacasPage' },
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage' },
        { title: 'Cadastros', component: 'CadastrosPage' },
        { title: 'Adoções', component: 'RacasPage' },
        { title: 'Sair', component: ''}
      ];    
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();     
    });
  }

  openPage(page : {title:string, component:string}) {

    switch (page.title) {
      case 'Sair':
      this.auth.logout();      
      this.nav.setRoot('HomePage');
      break;

      default:
      this.nav.setRoot(page.component);
    }
  }
}
