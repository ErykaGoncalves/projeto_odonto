'use client'

import React, { useReducer, createContext } from 'react'
import { initialState } from './data'
import { reducer } from './reducer'
import actions from './actions'
import { type IChildrenProp } from '@/types/global'

interface ICadastroClinicaContext {
  state: typeof initialState
  salvarPeriodo: (payload: string) => void
  salvarTurno: (payload: string) => void
  salvarNome: (payload: string) => void
}

export const CadastroClinicaContext = createContext<ICadastroClinicaContext | null>(null)

export default function CadastroProvider({
  children
}: IChildrenProp): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const salvarPeriodo = (payload: string): void => {
    dispatch({ type: actions.SALVAR_PERIODO, payload })
  }

  const salvarTurno = (payload: string): void => {
    dispatch({ type: actions.SALVAR_TURNO, payload })
  }

  const salvarNome = (payload: string): void => {
    dispatch({ type: actions.SALVAR_NOME, payload })
  }

  return (
    <CadastroClinicaContext.Provider
      value={{
        state,
        salvarPeriodo,
        salvarTurno,
        salvarNome
      }}
    >
      {children}
    </CadastroClinicaContext.Provider>
  )
}
