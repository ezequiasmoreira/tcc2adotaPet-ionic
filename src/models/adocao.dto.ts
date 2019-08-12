import { AnimalDTO } from "./animal.dto";

export interface AdocaolDTO {
    id : string;
    codigo: string;
	dataCadastro : string;	
    dataFinalizacao? : string;
    status : string;
	pessoaInterressado : string;
	pessoaIntermediador? : string;
	observacao : string;
	ongId? : string;
	animal : AnimalDTO;
}
    