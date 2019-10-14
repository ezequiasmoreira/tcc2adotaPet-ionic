import { RacaDTO } from "./raca.dto";

export interface AnimalDTO {
    id : string;
    codigo: string;
    nome : string;
    genero : string;
    porte : string;	
    vacinado : string;
    vermifugado : string;
    castrado : string;
    ongId? :	string;
    status : string;
    racaId :string;
    cidade : string;
    imageUrl? : string;
    raca? :RacaDTO;
    
}
