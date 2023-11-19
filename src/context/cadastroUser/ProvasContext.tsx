'use client'

import React, { useReducer, createContext } from 'react'
import { initialState } from './data'
import { reducer } from './reducer'
import actions from './actions'
import { type IChildrenProp } from '@/types/global'

interface IProvasContext {
  state: typeof initialState
  salvarCodFip: (payload: string) => void
  salvarDisciplina: (payload: string) => void
  salvarStatus: (payload: string) => void
  salvarDataPrevista: (payload: string) => void
}

export const ProvasContext = createContext<IProvasContext | null>(null)

export default function ProvasProvider({
  children
}: IChildrenProp): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const salvarCodFip = (payload: string): void => {
    dispatch({ type: actions.SALVAR_COD_FIP, payload })
  }

  const salvarDisciplina = (payload: string): void => {
    dispatch({ type: actions.SALVAR_DISCIPLINA, payload })
  }

  const salvarStatus = (payload: string): void => {
    dispatch({ type: actions.SALVAR_STATUS, payload })
  }

  const salvarDataPrevista = (payload: string): void => {
    dispatch({ type: actions.SALVAR_DATA_PREVISTA, payload })
  }

  return (
    <ProvasContext.Provider
      value={{
        state,
        salvarCodFip,
        salvarDisciplina,
        salvarStatus,
        salvarDataPrevista
      }}
    >
      {children}
    </ProvasContext.Provider>
  )
}
