export interface IAgendamentoResponse extends IDefaultResponse {
    msgOriginal: boolean | null
    msgUser: string
    error: string
    result: IAgendamento | null
  }
  
  export interface IAgendamento {
    nome: string
    periodo: string
    turno: string
  }