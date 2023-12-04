"use client";
import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Snackbar from "@/components/Snackbar";
import styles from "../../../../styles/page.module.css";
import HistoricoUsersData from "@/services/pacientes/historicoUsersData";
import { useSession } from "next-auth/react";
import myTheme from "@/theme";

export default function HistoricoUsersPage(): JSX.Element {
  const [snackBarActive, setSnackBarActive] = useState<boolean>(false);
  const [snackBarColor, setSnackBarColor] = useState<AlertColor | "loading">(
    "loading"
  );
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000);
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  const [historico, setHistorico] = useState<Array<any>>([]);
  const session = useSession();

  const handleSaveContent = async (): Promise<void> => {
    try {
      if (info.trim() === "") {
        setSnackBarActive(true);
        setSnackBarColor("warning");
        setSnackBarMessage("Por favor, preencha o campo antes de pesquisar");
        setAutoHideDuration(null);
        return;
      }

      const response = await HistoricoUsersData({
        info,
        jwt: session?.data?.jwt ?? "",
      });

      setHistorico(response.result);
    } catch (error) {
      console.error(error);
      setSnackBarColor("error");
      setSnackBarMessage("Houve um erro ao buscar histórico.");
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
          Histórico de Pacientes
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Por favor, informe seus dados para mostrar o histórico do paciente
          procurado.
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
                sx={{ width: "800px" }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveContent}
              style={{
                marginTop: "16px",
                background: "#cab3ff",
              }}
            >
              Pesquisar
            </Button>
          </Box>
          {historico.length > 0 && (
            <Box
              sx={{
                marginTop: "16px",
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
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.nome}
                  </Typography>
                  <Typography>código Aluno: {item.cod_alu}</Typography>
                  <Typography>
                    Data da Consulta: {item.data_consulta}
                  </Typography>
                  <Typography>
                    Horario da Consulta: {item.horario_consulta}
                  </Typography>
                  <Typography>Nome do Aluno: {item.nome_aluno}</Typography>
                  <Typography>
                    Status Pagamento:{" "}
                    {renderizarStatusPagamento(item.pagamento)}
                  </Typography>
                  <Typography>
                    Status Consulta: {renderizarStatusConsulta(item.consulta)}
                  </Typography>
                  <Typography>Procedimento: {item.procedimento}</Typography>
                  <Typography>Turno: {item.turno}</Typography>
                  <Typography>Valor: {item.valor}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

function renderizarStatusPagamento(pagamento: string): string {
  switch (pagamento) {
    case "P":
      return "PAGO";
    case "NP":
      return "NÃO PAGO";
    default:
      return "PENDENTE";
  }
}

function renderizarStatusConsulta(consulta: string): string {
  switch (consulta) {
    case "R":
      return "REALIZADO";
    case "NR":
      return "NAO REALIZADO";
    default:
      return "PENDENTE";
  }
}
