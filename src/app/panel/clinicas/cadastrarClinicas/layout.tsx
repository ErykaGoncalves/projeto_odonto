import React from "react";
import '../../../../styles/page.module.css';
import CadastroClinicaContext from "@/context/cadastroClinica/CadastroClinicaContext";

export default function CadastrarClinicas({ children }: { children: React.ReactNode }) {
  return (
    <CadastroClinicaContext>
      {children}
    </CadastroClinicaContext>
  );
}