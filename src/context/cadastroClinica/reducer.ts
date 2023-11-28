import actions from './actions'
import { type initialState } from './data'

type ACTIONTYPE =
  | {
    type: typeof actions.SALVAR_PERIODO
    payload: string
  }
  | {
    type: typeof actions.SALVAR_TURNO
    payload: string
  }
  | {
    type: typeof actions.SALVAR_PROCEDIMENTO
    payload: string
  }
  | {
    type: typeof actions.SALVAR_ID_PROCEDIMENTO
    payload: string
  }

export const reducer = (
  state: typeof initialState,
  action: ACTIONTYPE
): any => {
  switch (action.type) {
    case actions.SALVAR_PERIODO:
      return { ...state, periodo: action.payload }
    case actions.SALVAR_TURNO:
      return { ...state, turno: action.payload }
    case actions.SALVAR_PROCEDIMENTO:
      return { ...state, procedimento: action.payload }
    case actions.SALVAR_ID_PROCEDIMENTO:
      return { ...state, procedimento_id : action.payload }
    default:
      return state
  }
}
