
export interface ICadastroUserTotal {
    email: string
    endereco: string
    telefone: string
    data_nasc: string
    cpf: string
    nome: string
  }

export interface ICadastroUserResponse extends IDefaultResponse {
    msgOriginal: boolean | null
    msgUser: string
    error: string
    nro_prontuario: string
    result: ICadastroUser[] | null
  }
  
  export interface ICadastroUser {
    email: string
    endereco: string
    telefone: string
    data_nasc: string
    cpf: string
    nome: string
  }