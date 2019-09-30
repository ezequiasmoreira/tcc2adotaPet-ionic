import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AnimalService } from '../../services/domain/animal.service';
import { AnimalDTO } from '../../models/animal.dto';
import { API_CONFIG, NEW_API_CONFIG } from '../../config/api.config';
import { AdocaoService } from '../../services/domain/adocao.service';
import { StorageService } from '../../services/storage.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PessoaService } from '../../services/domain/pessoa.service';
import { PessoaDTO } from '../../models/pessoa.dto';

@IonicPage()
@Component({
  selector: 'page-adocoes',
  templateUrl: 'adocoes.html',
})
export class AdocoesPage {

  animal: AnimalDTO;
  habilita : boolean;
  pdfObj = null;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public animalService: AnimalService,
     public adocaoService: AdocaoService,
     private storage: StorageService,
     private pessoaService: PessoaService,
     private plt: Platform, 
     private file: File, 
     private fileOpener: FileOpener) {
       
  }
  
  ionViewDidLoad() {
    let animal_id = this.navParams.get('animal_id');
    this.animalService.findById(animal_id)
      .subscribe(response => {
        this.animal = response;
        console.log(this.animal)
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.animal.imageUrl = `${NEW_API_CONFIG.baseUrl}/animal/an${this.animal.id}.jpg`;
  }
  radioChecked(escolha : string) {
    if (escolha == "aceito"){
      this.habilita = true;
    }else{
      this.habilita = false;
    }        
  }
  criarAdocao(animal_id : string){

    this.adocaoService.insert(animal_id)
    .subscribe(response => {
      console.log("deu certo");
      let localUser = this.storage.getLocalUser();
      if (localUser && localUser.email) {
        this.pessoaService.findByEmail(localUser.email)
          .subscribe(response => {
            this.createPdf(response.nome);
          },
          error => { });
      } 
      
      this.navCtrl.setRoot("MyAdocoesPage");
    },
    error => {});
  }

  createPdf(nome:string) {
    var docDefinition = {
      content: [
        { text: 'Termo de adoção', style: 'header' },
        { text: new Date().toLocaleDateString('pt-BR'), alignment: 'right' },
 
        { text: 'Me comprometo a:', style: 'subheader' },

        { text: '1. Garantir o bem-estar deste animal, respeitando suas características e zelando pelas '+
        'suas necessidades psicológicas e físicas; ', style: 'story', margin: [0, 10, 0, 5] },

        { text: '2. Garantir sua saúde física fornecendo abrigo, alimento adequado, higiene, vacinas e '+
        'levando-o regularmente ao veterinário; ', style: 'story', margin: [0, 5, 0, 5] },

        { text: '3. Garantir sua saúde psicológica respeitando suas características e fornecendo atenção, '+
        'carinho, e a possibilidade de interagir com outras pessoas ou animais; ', style: 'story', margin: [0, 5, 0, 5] },

        { text: '4. Garantir sua segurança, mantendo-o sempre dentro de casa e fazendo passeios com '+
        'coleira e guia (no caso de cães); ', style: 'story', margin: [0, 5, 0, 5] },

        { text: '5. Mantê-lo em ambiente limpo, arejado e espaçoso, com possibilidade de abrigo do sol '+
        'ou chuva; ', style: 'story', margin: [0, 5, 0, 5] },

        { text: '6. Não mantê-lo preso em espaços pequenos ou em correntes; ', style: 'story', margin: [0, 5, 0, 5] },
 
        { text: '7. Identificá-lo com plaquinha ou microchip, tornando mais fácil recuperá-lo caso ele se '+
        'perca; ', style: 'story', margin: [0, 5, 0, 5] },
       
        { text: '8. NUNCA e em nenhuma circunstância abandoná-lo na rua ou entregá-lo a um '+
        'desconhecido; ', style: 'story', margin: [0, 5, 0, 5] },
        
        { text: '9. Devolvê-lo ao protetor responsável pela adoção se houver desistência ', style: 'story', margin: [0, 5, 0, 5] },

        { text: '10. Comunicar qualquer outro destino que envolva o animal, tais como desaparecimento '+
        'ou morte; ', style: 'story', margin: [0, 5, 0, 5] },
        
        { text: '11. Permitir a visita do protetor responsável pela adoção ou antigo dono até a completa '+
        'adaptação do animal (6 meses). ', style: 'story', margin: [0, 5, 0, 10] },

        { text: 'Estou ciente de que:', style: 'subheader' },

        { text: 'Um cão ou gato pode viver até 15 anos ou mais, e durante todo este tempo serei '+
        'responsável pelo seu bem-estar, principalmente durante sua velhice; ', alignment: 'left', style: 'story', margin: [0, 10, 0, 5] },
       
        { text: 'O não cumprimento dos itens acima poderá ser interpretado como maus-tratos, o que '+
        'acarretará a retirada do animal pelo doador responsável a qualquer tempo; ',alignment: 'left', style: 'story', margin: [0, 5, 0, 5] },
        
        { text: 'Maus-tratos é crime e estarei sujeito às penas previstas pela Lei Federal de Proteção '+
        'aos Animais nº 9605 art. 32 de 13/fevereiro/1998, no caso de infração. ',alignment: 'left', style: 'story', margin: [0, 5, 0, 65] },

        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 255, y2: 0, lineWidth: 1 } ], alignment: 'center',},
        { text: nome, style: 'story' },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

}
