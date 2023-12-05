'use client'
import React, { useReducer, createContext } from 'react';
import { initialState } from './data';
import { reducer } from './reducer';
import actions from './actions';
import { IChildrenProp } from '@/types/global';

interface IAgendamentoPacienteContext {
  state: typeof initialState;
  salvarClinica: (payload: string) => void;
  salvarData: (payload: string) => void;
  salvarHorario: (payload: string) => void;
  salvarAlunos: (payload: string) => void;
}

export const AgendamentoPacienteContext = createContext<IAgendamentoPacienteContext | null>(null);

export default function CadastroProvider({
  children,
}: IChildrenProp): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const salvarClinica = (payload: string): void => {
    dispatch({ type: actions.SALVAR_CLINICA, payload });
  };

  const salvarData = (payload: string): void => {
    dispatch({ type: actions.SALVAR_DATA, payload });
  };

  const salvarHorario = (payload: string): void => {
    dispatch({ type: actions.SALVAR_HORARIO, payload });
  };

  const salvarAlunos = (payload: string): void => {
    dispatch({ type: actions.SALVAR_ALUNOS, payload });
  };

  return (
    <AgendamentoPacienteContext.Provider
      value={{
        state,
        salvarClinica,
        salvarData,
        salvarHorario,
        salvarAlunos
      }}
    >
      {children}
    </AgendamentoPacienteContext.Provider>
  );
}
