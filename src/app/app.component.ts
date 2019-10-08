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
  notificacao;

  pages: Array<{title: string, component: string, qtde : string}>;

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
            if((this.pessoa.perfil == USUARIO_PERFIL.VOLUNTARIO) 
            || (this.pessoa.perfil == USUARIO_PERFIL.ADMIN) 
            || (this.pessoa.perfil  == USUARIO_PERFIL.MASTER)){
              this.acompanhamentoService.atendido()      
              .subscribe(response => {
                this.isAuthorized(this.pessoa.perfil, response.length>0?response.length+"":"");              
              },
              error => {});              
            } 
          }        
        },
        error => { });
    }
  }
  isAuthorized(perfil :string,quantidadeAcompanhamento){    
    if ( perfil == USUARIO_PERFIL.USUARIO ){ 
      this.pages = [
        { title: 'Acompanhamento ', component: 'AcompanhamentoSolicitadoPage',qtde: quantidadeAcompanhamento},     
        { title: 'Animais', component: 'HomeFiltroPage',qtde: quantidadeAcompanhamento },
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: quantidadeAcompanhamento },
        { title: 'Perfil', component: 'ProfilePage',qtde: quantidadeAcompanhamento }, 
        { title: 'Raças', component: 'RacasPage',qtde: quantidadeAcompanhamento },        
        { title: 'Sair', component: '',qtde: quantidadeAcompanhamento}
      ];
    }else if(perfil == USUARIO_PERFIL.VOLUNTARIO){
      this.pages = [
        { title: 'Acompanhamento', component: 'AcompanhamentoPesquisaPage',qtde: quantidadeAcompanhamento },
        { title: 'Adoções', component: 'AdocoesPainelPage',qtde: quantidadeAcompanhamento },
        { title: 'Animais', component: 'HomeFiltroPage',qtde: quantidadeAcompanhamento },
        { title: 'Cadastros', component: 'CadastrosPage',qtde: quantidadeAcompanhamento },
        { title: 'Perfil', component: 'ProfilePage',qtde: quantidadeAcompanhamento },
        { title: 'Raças', component: 'RacasPage',qtde: quantidadeAcompanhamento },        
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: quantidadeAcompanhamento },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage',qtde: quantidadeAcompanhamento },        
        { title: 'Sair', component: '',qtde: quantidadeAcompanhamento}
      ];    
    }else if(perfil == USUARIO_PERFIL.ADMIN){
      this.pages = [
        { title: 'Acompanhamento', component: 'AcompanhamentoPesquisaPage',qtde: quantidadeAcompanhamento },
        { title: 'Adoções', component: 'AdocoesPainelPage',qtde: quantidadeAcompanhamento },
        { title: 'Animais', component: 'HomeFiltroPage',qtde: quantidadeAcompanhamento },
        { title: 'Cadastros', component: 'CadastrosPage',qtde: quantidadeAcompanhamento },        
        { title: 'Perfil', component: 'ProfilePage',qtde: quantidadeAcompanhamento },
        { title: 'Raças', component: 'RacasPage',qtde: quantidadeAcompanhamento },        
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: quantidadeAcompanhamento },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage',qtde: quantidadeAcompanhamento },
        
        { title: 'Sair', component: '',qtde: quantidadeAcompanhamento}
      ];    
    }else if(perfil == USUARIO_PERFIL.MASTER){
      this.pages = [
        { title: 'Acompanhamento', component: 'AcompanhamentoPesquisaPage',qtde: quantidadeAcompanhamento },
        { title: 'Adoções', component: 'AdocoesPainelPage',qtde: quantidadeAcompanhamento },
        { title: 'Animais', component: 'HomeFiltroPage',qtde: quantidadeAcompanhamento },
        { title: 'Cadastros', component: 'CadastrosPage',qtde: quantidadeAcompanhamento },
        { title: 'Perfil', component: 'ProfilePage',qtde: quantidadeAcompanhamento },
        { title: 'Raças', component: 'RacasPage',qtde: quantidadeAcompanhamento },       
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: quantidadeAcompanhamento },
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage',qtde: quantidadeAcompanhamento },       
        { title: 'Sair', component: '',qtde: quantidadeAcompanhamento}
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
  isNotification(pagina : string,qtde : string){
    console.log(pagina);
    if ((pagina.trim() == "Acompanhamento") && (qtde != "")){
      return true;
    }else{
      return false;
    }

  }
}
