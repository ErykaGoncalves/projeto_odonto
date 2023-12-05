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
    default:
      return state;
  }
};
