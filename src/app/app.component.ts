import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { PessoaService } from '../services/domain/pessoa.service';
import { PessoaDTO } from '../models/pessoa.dto';
import { USUARIO_PERFIL } from '../config/perfil';
import { AcompanhamentoService } from '../services/domain/acompanhamento.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';
  perfil :string;
  pessoa: PessoaDTO;
  quantidadeAcompanhamento;

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public storage: StorageService,
    public pessoaService: PessoaService,
    public acompanhamentoService: AcompanhamentoService
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
          if ( this.pessoa.perfil == USUARIO_PERFIL.USUARIO ){ 
            this.acompanhamentoService.solicitado()      
            .subscribe(response => {
              this.isAuthorized(this.pessoa.perfil, response.length>0?response.length+"":"");              
            },
            error => {});
          }else{
            this.isAuthorized(this.pessoa.perfil, "");
          }         
        },
        error => { });
    }
  }
  isAuthorized(perfil :string,quantidadeAcompanhamento){    
    if ( perfil == USUARIO_PERFIL.USUARIO ){ 
      this.pages = [
        { title: 'Animais', component: 'HomeFiltroPage' },
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Perfil', component: 'ProfilePage' }, 
        { title: 'Raças', component: 'RacasPage' },
        { title: 'Acompanhamento '+ quantidadeAcompanhamento, component: 'AcompanhamentoSolicitadoPage'},     
        { title: 'Sair', component: ''}
      ];
    }else if(perfil == USUARIO_PERFIL.VOLUNTARIO){
      this.pages = [
        { title: 'Acompanhamentos', component: 'AcompanhamentoPesquisaPage' },
        { title: 'Adoções', component: 'AdocoesPainelPage' },
        { title: 'Animais', component: 'HomeFiltroPage' },
        { title: 'Cadastros', component: 'CadastrosPage' },
        { title: 'Perfil', component: 'ProfilePage' },
        { title: 'Raças', component: 'RacasPage' },        
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage' },        
        { title: 'Sair', component: ''}
      ];    
    }else if(perfil == USUARIO_PERFIL.ADMIN){
      this.pages = [
        { title: 'Acompanhamentos', component: 'AcompanhamentoPesquisaPage' },
        { title: 'Adoções', component: 'AdocoesPainelPage' },
        { title: 'Animais', component: 'HomeFiltroPage' },
        { title: 'Cadastros', component: 'CadastrosPage' },        
        { title: 'Perfil', component: 'ProfilePage' },
        { title: 'Raças', component: 'RacasPage' },        
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage' },
        
        { title: 'Sair', component: ''}
      ];    
    }else if(perfil == USUARIO_PERFIL.MASTER){
      this.pages = [
        { title: 'Acompanhamentos', component: 'AcompanhamentoPesquisaPage' },
        { title: 'Adoções', component: 'AdocoesPainelPage' },
        { title: 'Animais', component: 'HomeFiltroPage' },
        { title: 'Cadastros', component: 'CadastrosPage' },
        { title: 'Perfil', component: 'ProfilePage' },
        { title: 'Raças', component: 'RacasPage' },       
        { title: 'Minhas adoções', component: 'MyAdocoesPage' },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage' },       
        { title: 'Sair', component: ''}
      ];    
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();     
    });
  }

  openPage(page : {title:string, component:string}) {
    console.log(page)
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
