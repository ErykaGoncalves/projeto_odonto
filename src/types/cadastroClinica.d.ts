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
  id_procedimento: string
}