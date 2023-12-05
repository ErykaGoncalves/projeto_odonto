import actions from './actions'
import { type initialState } from './data'

type ACTIONTYPE =
  | {
    type: typeof actions.SALVAR_CLINICA;
    payload: string;
  }
  | {
    type: typeof actions.SALVAR_DATA;
    payload: string;
  }
  | {
    type: typeof actions.SALVAR_HORARIO;
    payload: string;
  }
  | {
    type: typeof actions.SALVAR_ALUNOS;
    payload: string;
  }
  | {
    type: typeof actions.SALVAR_PACIENTE;
    payload: string;
  }
  | {
    type: typeof actions.SALVAR_PACIENTE_ID;
    payload: string;
  }
  | {
    type: typeof actions.SALVAR_ALUNO_ID;
    payload: string;
  }
  

export const reducer = (
  state: typeof initialState,
  action: ACTIONTYPE
): any => {
  switch (action.type) {
    case actions.SALVAR_CLINICA:
      return { ...state, clinica: action.payload };
    case actions.SALVAR_DATA:
      return { ...state, data: action.payload };
    case actions.SALVAR_HORARIO:
      return { ...state, horario: action.payload };
    case actions.SALVAR_ALUNOS:
      return { ...state, alunos: action.payload };
    case actions.SALVAR_PACIENTE:
      return { ...state, paciente: action.payload };
    case actions.SALVAR_PACIENTE_ID:
      return { ...state, idPaciente: action.payload };
    case actions.SALVAR_ALUNO_ID:
      return { ...state, alunoId: action.payload };
      case actions.SALVAR_PACIENTE_ID:
  return { ...state, pacienteId: action.payload };
    default:
      return state;
  }
};
