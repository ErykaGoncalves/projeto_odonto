import actions from './actions'
import { type initialState } from './data'

type ACTIONTYPE =
  | {
      type: typeof actions.SALVAR_COD_FIP
      payload: string
    }
  | {
      type: typeof actions.SALVAR_DISCIPLINA
      payload: string
    }
  | {
      type: typeof actions.SALVAR_STATUS
      payload: string
    }
  | {
      type: typeof actions.SALVAR_DATA_PREVISTA
      payload: string
    }

export const reducer = (
  state: typeof initialState,
  action: ACTIONTYPE
): any => {
  switch (action.type) {
    case actions.SALVAR_COD_FIP:
      return { ...state, codFip: action.payload }
    case actions.SALVAR_DISCIPLINA:
      return { ...state, disciplina: action.payload }
    case actions.SALVAR_STATUS:
      return { ...state, status: action.payload }
    case actions.SALVAR_DATA_PREVISTA:
      return { ...state, data: action.payload }
    default:
      return state
  }
}
