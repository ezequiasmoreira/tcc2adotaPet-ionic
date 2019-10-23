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
import { AdocaoService } from '../services/domain/adocao.service';

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

  pages: Array<{title: string, component: string, qtde : string,qtdeAdocoes : string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public storage: StorageService,
    public pessoaService: PessoaService,
    public acompanhamentoService: AcompanhamentoService,
    public adocaoService: AdocaoService
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
              this.isAuthorized(this.pessoa.perfil, response.length>0?response.length+"":"","");              
            },
            error => {});
          }else{
            this.acompanhamentoService.atendido()      
            .subscribe(response => {
              
              this.adocaoService.getAdocoesPorOng()      
              .subscribe(adocao => {
                this.isAuthorized(this.pessoa.perfil,(response.length>0?response.length+"":""),adocao.length>0?adocao.length+"":"");              
              },
            error => {});                
            },
            error => {});  
                        
          }                  
        },
        error => { });
    }
  }
  isAuthorized(perfil :string,quantidadeAcompanhamento,qtdeAdocoes){    
    let paginas: Array<{title: string, component: string, qtde : string,qtdeAdocoes : string}>;
    if ( perfil == USUARIO_PERFIL.USUARIO ){ 
      paginas = [
        { title: 'Acompanhamento ', component: 'AcompanhamentoSolicitadoPage',qtde: quantidadeAcompanhamento,qtdeAdocoes:""},     
        { title: 'Animais', component: 'HomeFiltroPage',qtde: "",qtdeAdocoes:""}, 
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: "",qtdeAdocoes:""}, 
        { title: 'Perfil', component: 'ProfilePage',qtde: "",qtdeAdocoes:""},  
        { title: 'Raças', component: 'RacasPage',qtde: "",qtdeAdocoes:""},       
        { title: 'Sair', component: '',qtde: "",qtdeAdocoes:""}
      ];
    }else if(perfil == USUARIO_PERFIL.VOLUNTARIO){
      paginas = [
        { title: 'Acompanhamento', component: 'AcompanhamentoPesquisaPage',qtde: quantidadeAcompanhamento ,qtdeAdocoes:""}, 
        { title: 'Adoções', component: 'AdocoesPainelPage',qtde: "",qtdeAdocoes:""}, 
        { title: 'Animais', component: 'HomeFiltroPage',qtde: "",qtdeAdocoes:""}, 
        { title: 'Cadastros', component: 'CadastrosPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Perfil', component: 'ProfilePage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Raças', component: 'RacasPage',qtde: "" ,qtdeAdocoes:""},         
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage',qtde: "",qtdeAdocoes:qtdeAdocoes},        
        { title: 'Sair', component: '',qtde: "",qtdeAdocoes:""}
      ];    
    }else if(perfil == USUARIO_PERFIL.ADMIN){
      paginas = [
        { title: 'Acompanhamento', component: 'AcompanhamentoPesquisaPage',qtde: quantidadeAcompanhamento ,qtdeAdocoes:""}, 
        { title: 'Adoções', component: 'AdocoesPainelPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Animais', component: 'HomeFiltroPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Cadastros', component: 'CadastrosPage',qtde: "" ,qtdeAdocoes:""},         
        { title: 'Perfil', component: 'ProfilePage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Raças', component: 'RacasPage',qtde: "",qtdeAdocoes:""},         
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage',qtde: "",qtdeAdocoes:qtdeAdocoes},        
        { title: 'Sair', component: '',qtde: "",qtdeAdocoes:""}
      ];    
    }else if(perfil == USUARIO_PERFIL.MASTER){
      paginas = [
        { title: 'Acompanhamento', component: 'AcompanhamentoPesquisaPage',qtde: quantidadeAcompanhamento ,qtdeAdocoes:""}, 
        { title: 'Adoções', component: 'AdocoesPainelPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Animais', component: 'HomeFiltroPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Cadastros', component: 'CadastrosPage',qtde: "" ,qtdeAdocoes:""}, 
        { title: 'Perfil', component: 'ProfilePage',qtde: "",qtdeAdocoes:""}, 
        { title: 'Raças', component: 'RacasPage',qtde: "" ,qtdeAdocoes:""},       
        { title: 'Minhas adoções', component: 'MyAdocoesPage',qtde: "",qtdeAdocoes:""}, 
        { title: 'Solicitação de adoções', component: 'AdocoesSolicitacaoPage',qtde: "" ,qtdeAdocoes:qtdeAdocoes},       
        { title: 'Sair', component: '',qtde: "",qtdeAdocoes:""}
      ];    
    }
    this.pages = paginas.filter(function (el) {
      return el != null;
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
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

  isNotification(pagina : string,qtdeAcompanhamento : string, qtdeAdocoes : string ){
    if(pagina != null){
      if (((pagina.trim() == "Acompanhamento") && (qtdeAcompanhamento != "")) 
      || ((pagina.trim() == "Solicitação de adoções") && (qtdeAdocoes != ""))){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }
}
