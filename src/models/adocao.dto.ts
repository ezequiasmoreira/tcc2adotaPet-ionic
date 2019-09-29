import { AnimalDTO } from "./animal.dto";
import { PessoaDTO } from "./pessoa.dto";

export interface AdocaolDTO {
    id : string;
    codigo: string;
	dataCadastro : string;	
    dataFinalizacao? : string;
    status : string;
	pessoaIntermediador? : string;
	observacao : string;
	ongId? : string;
	animal : AnimalDTO;
	pessoaInterressado? : PessoaDTO;
}
    