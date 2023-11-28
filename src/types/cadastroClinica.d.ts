export interface ICadastroClinicaResponse extends IDefaultResponse {
  msgOriginal: boolean | null
  msgUser: string
  error: string
  result: ICadastroClinica | null
}

export interface ICadastroClinica {
  nome: string
  periodo: string
  turno: string
  procedimento_id: string
}

export interface Procedimento {
  id: string;
  nome: string;
  dia: string;
  valor: string;
  nome_procedimento: string;
}