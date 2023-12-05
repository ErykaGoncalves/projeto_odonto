"use client";
import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Snackbar from "@/components/Snackbar";
import styles from "../../../../styles/page.module.css";
import { useSession } from "next-auth/react";
import myTheme from "@/theme";
import BuscaUsersData from "@/services/pacientes/buscaUserData";
import Buttons from "./components/Buttons";
import ModalAtualizar from "./components/ModalAtualizar";

interface BuscaUsersPageProps {
  setOpenModal: (value: boolean) => void;
  onUserSelect: (userId: number) => void;
}

export default function BuscaUsersPage({
  setOpenModal,
  onUserSelect,
}: BuscaUsersPageProps): JSX.Element {
  const [snackBarActive, setSnackBarActive] = useState<boolean>(false);
  const [snackBarColor, setSnackBarColor] = useState<AlertColor | "loading">(
    "loading"
  );
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000);
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  const [historico, setHistorico] = useState<Array<any>>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const session = useSession();
  const [selectedUserData, setSelectedUserData] = useState<any | null>(null);

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
      console.log(response)
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
    const selectedUser = historico.find((user) => user.id === userId);
    setSelectedUserData(selectedUser);
    setSelectedUserId(userId);
  
    if (typeof onUserSelect === 'function') {
      onUserSelect(userId);
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
                  <Buttons onUserSelect={() => handleUserSelection(item.id)} />
                </Box>
              ))}

            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
