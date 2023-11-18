'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from "react";
import Users from '../../../../../public/images/agendamento.svg'
import Image from 'next/image'
import styles from '../../../../styles/page.module.css'

export default function CadastroUsersPage(): JSX.Element {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Agendamento de Consultas
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Por favor, informe os dados do paciente abaixo para agendá-lo a uma consulta.
          </Typography>
          <Formik
            initialValues={{
                numeroProntuario: ''
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
                      name="numeroProntuario"
                      as={TextField}
                      label="Número de Prontuário ou CPF"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.numeroProntuario}
                      sx={{ width: '800px' }}
                    />
                  </Box>
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', background: '#cab3ff' }}>
                    Pesquisar
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
