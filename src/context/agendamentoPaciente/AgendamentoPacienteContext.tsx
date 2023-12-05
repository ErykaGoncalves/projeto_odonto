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
  salvarPaciente: (payload: string, idPaciente: string) => void; 
  salvarAlunoId: (payload: string) => void;
  salvarPacienteId: (payload: string) => void;
  salvarPacienteModal: (payload: string) => void;
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

  const salvarPaciente = (payload: string): void => {
    dispatch({ type: actions.SALVAR_PACIENTE, payload });
  };
  const salvarAlunoId = (payload: string): void => {
    dispatch({ type: actions.SALVAR_ALUNO_ID, payload });
  };
  
  const salvarPacienteId = (payload: string): void => {
    dispatch({ type: actions.SALVAR_PACIENTE_ID, payload });
  };
  const salvarPacienteModal = (pacienteId: string) => {
    dispatch({ type: 'SALVAR_PACIENTE_MODAL', payload: pacienteId });
};

  return (
    <AgendamentoPacienteContext.Provider
    value={{
      state,
      salvarClinica,
      salvarData,
      salvarHorario,
      salvarAlunos,
      salvarPaciente,
      salvarAlunoId,
      salvarPacienteId,
      salvarPacienteModal
    }}
    >
      {children}
    </AgendamentoPacienteContext.Provider>
  );
}
