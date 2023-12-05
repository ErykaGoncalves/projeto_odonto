"use client";
import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Snackbar from "@/components/Snackbar";
import styles from "../../../../styles/page.module.css";
import { useSession } from "next-auth/react";
import myTheme from "@/theme";
import BuscaUsersData from "@/services/pacientes/buscaUserData";
import ModalAgendarConsulta from "./components/ModalAgendarConsulta";
import { AgendamentoPacienteContext } from "@/context/agendamentoPaciente/AgendamentoPacienteContext";

export default function BuscaUsersPage(): JSX.Element {
  const [snackBarActive, setSnackBarActive] = useState<boolean>(false);
  const [snackBarColor, setSnackBarColor] = useState<AlertColor | "loading">(
    "loading"
  );
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000);
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  const [historico, setHistorico] = useState<Array<any>>([]);
  const [openModalAgendar, setOpenModalAgendar] = React.useState(false);
  const session = useSession();
  const context = useContext(AgendamentoPacienteContext)

  const handleOpenModalAtualizar = (idPaciente: string): void => {
    context?.salvarPaciente(info, idPaciente);
    setOpenModalAgendar(true);
    context?.salvarPacienteModal(idPaciente);
};
  const handleSearchContent = async (): Promise<void> => {
    try {
      if (info.trim() === "") {
        setSnackBarActive(true);
        setSnackBarColor("warning");
        setSnackBarMessage("Por favor, preencha o campo antes de pesquisar");
        setAutoHideDuration(null);
        return;
      }

      const response = await BuscaUsersData({
        info,
        jwt: session?.data?.jwt ?? ""
      });

      if (response.error) {
        setSnackBarColor("error");
        setSnackBarMessage("Houve um erro ao buscar os dados.");
      }
      else {
        setHistorico(response.result);
      }
    } catch (error) {
      console.error(error);
      setSnackBarColor("error");
      setSnackBarMessage("Houve um erro ao buscar os dados.");
      setAutoHideDuration(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {snackBarActive && (
        <Snackbar
          snackBarActive={snackBarActive}
          setSnackBarActive={setSnackBarActive}
          message={snackBarMessage}
          severity={snackBarColor}
          autoHideDuration={autoHideDuration}
        />
      )}
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Agendar Consulta
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Por favor, informe seus dados para fazer o agendamento do paciente.
        </Typography>
        <Box sx={{ padding: "50px" }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "block" }}>
              <TextField
                name="numeroProntuario"
                label="Número de Prontuário ou CPF"
                variant="outlined"
                className={styles.lineForm}
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchContent}
              style={{
                marginTop: "16px",
                background: myTheme.palette.primary.main
              }}
            >
              Pesquisar
            </Button>
          </Box>
          {historico.length > 0 && (
            <Box
              sx={{
                marginTop: "50px",
                padding: "20px",
                background: "#E5E5E5",
                borderRadius: "10px",
              }}
            >
              {historico.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    background: myTheme.palette.primary.main,
                    padding: "20px",
                    borderRadius: "10px",
                    margin: "10px",

                  }}
                >
                  <Box sx={{
                    display: 'flex', fontWeight: "bold",
                    color: "#fff",
                    textTransform: "uppercase",
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography>
                      {item.nome}
                    </Typography>
                    <Typography>
                      CPF: {item.cpf}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModalAtualizar(item.pacienteId)}
                      style={{
                        background: myTheme.palette.primary.dark,
                      }}
                    >
                      Agendar
                    </Button>
                  </Box>
                </Box>
              ))}

            </Box>
          )}
        </Box>
      </Box>
      <ModalAgendarConsulta openModal={openModalAgendar} setOpenModal={setOpenModalAgendar} />
    </>
  );
}
