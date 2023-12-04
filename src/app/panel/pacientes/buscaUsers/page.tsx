"use client";
import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Snackbar from "@/components/Snackbar";
import styles from "../../../../styles/page.module.css";
import { useSession } from "next-auth/react";
import myTheme from "@/theme";
import BuscaUsersData from "@/services/pacientes/buscaUserData";
import Buttons from "./components/Buttons";

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
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Adicione esta linha
  const session = useSession();

  const handleExcluirClick = (): void => {
    // Handle the click for "Excluir" button
    console.log("Excluir clicked");
  };

  const handleAtualizarClick = (): void => {
    // Handle the click for "Atualizar" button
    console.log("Atualizar clicked");
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
  const handleUserSelection = (userId: number) => {
    setSelectedUserId(userId);
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
          Busca por Pacientes
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Por favor, informe seus dados para mostrar os pacientes.
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
                  <Typography>Número de Prontuário: {item.nro_prontuario}</Typography>
                  <Typography>
                    CPF: {item.cpf}
                  </Typography>
                  <Typography>
                    Data de nascimento: {item.data_nascimento}
                  </Typography>
                  <Typography>Email: {item.email}</Typography>
                  <Typography>
                    Telefone: {item.telefone}
                  </Typography>
                  <Typography>
                    Endereço: {item.endereco}
                  </Typography>
                  <Buttons
                    onExcluirClick={handleExcluirClick}
                    onAtualizarClick={handleAtualizarClick}
                  />
                </Box>
              ))}

            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
