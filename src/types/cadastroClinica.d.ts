export interface ICadastroClinicaResponse extends IDefaultResponse {
  msgOriginal: boolean | null
  msgUser: string
  error: string
  result: ICadastroClinica | null
}

export interface ICadastroClinica {
  nome_clinica: string | undefined;
  horario_consulta: string | undefined;
  paciente_id: string | undefined;
  aluno_id: string | undefined;
}