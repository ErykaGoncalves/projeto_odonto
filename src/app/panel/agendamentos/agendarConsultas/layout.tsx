import React from "react";
import '../../../../styles/page.module.css';
import AgendamentoPacienteContext from "@/context/agendamentoPaciente/AgendamentoPacienteContext";

export default function AgendarConsultas({ children }: { children: React.ReactNode }) {
  return (
    <AgendamentoPacienteContext>
      {children}
    </AgendamentoPacienteContext>
  );
}