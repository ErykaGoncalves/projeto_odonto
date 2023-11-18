'use client'
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from "react";
import Users from '../../../../public/images/users.svg'
import Image from 'next/image'
import styles from '../../../styles/page.module.css'

export default function CadastroUsersPage(): JSX.Element {
  const lineForm = useMediaQuery('(max-width:1200px)')

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ padding: '20px', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Cadastro de Pacientes
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Seja bem-vindo ao sistema de cadastro de usuários, por favor, informe os dados do paciente abaixo para cadastrá-lo no sistema.
          </Typography>
          <Formik
            initialValues={{
              nome: '',
              cpf: '',
              nascimento: '',
              email: '',
              telefone: '',
              endereco: ''
            }}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm();
            }}
          >
            {({ handleChange, handleBlur, values }) => (
              <Box sx={{ padding: '50px' }}>
                <Form>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="nome"
                      as={TextField}
                      label="Nome Completo"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nome}
                      sx={{ width: '800px' }}

                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="cpf"
                      as={TextField}
                      label="CPF"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cpf}
                      sx={{ width: '800px' }}

                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="nascimento"
                      as={TextField}
                      label="Data de nascimento"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nascimento}
                      sx={{ width: '800px' }}

                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      sx={{ width: '800px' }}

                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="telefone"
                      as={TextField}
                      label="Telefone"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.telefone}
                      sx={{ width: '800px' }}

                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="endereco"
                      as={TextField}
                      label="Endereço"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.endereco}
                      sx={{ width: '800px' }}

                    />
                  </Box>
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', background: '#cab3ff' }}>
                    Cadastrar
                  </Button>
                  <ErrorMessage name="nome" component="div" />
                </Form>
              </Box>
            )}
          </Formik>
        </Box>
        <Box className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Image src={Users} alt="Fundo" width={650} height={800} />
        </Box>
      </Box >
    </>
  );
}
