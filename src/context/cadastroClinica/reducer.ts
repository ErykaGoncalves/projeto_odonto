import actions from './actions'
import { type initialState } from './data'

type ACTIONTYPE =
  | {
      type: typeof actions.SALVAR_PERIODO;
      payload: string;
    }
  | {
      type: typeof actions.SALVAR_TURNO;
      payload: string;
    }
  | {
      type: typeof actions.SALVAR_NOME;
      payload: string;
    }

    export const reducer = (
      state: typeof initialState,
      action: ACTIONTYPE
    ): any => {
      switch (action.type) {
        case actions.SALVAR_PERIODO:
          return { ...state, periodo: action.payload };
        case actions.SALVAR_TURNO:
          return { ...state, turno: action.payload };
        case actions.SALVAR_NOME:
          return { ...state, nome: action.payload };
        default:
          return state;
      }
    };
