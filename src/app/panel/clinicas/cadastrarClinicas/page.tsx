'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from "react";
import Clinic from '../../../../../public/images/clinica.svg'
import Image from 'next/image'
import styles from '../../../../styles/page.module.css'

export default function CadastroUsersPage(): JSX.Element {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Cadastro de Clínicas
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Para realizar o cadastro de uma nova clínica, por favor, informe os dados abaixo.
          </Typography>
          <Formik
            initialValues={{
              procedimento: '',
              horario: '',
              periodo: '',
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
                      name="periodo"
                      as={TextField}
                      label="Período"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.periodo}
                      sx={{ width: '800px' }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="horario"
                      as={TextField}
                      label="Horário"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.horario}
                      sx={{ width: '800px' }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Field
                      name="procedimento"
                      as={TextField}
                      label="Procedimento"
                      variant="outlined"
                      className={styles.lineForm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.procedimento}
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
          <Image src={Clinic} alt="Fundo" width={650} height={800} />
        </Box>
      </Box >
    </>
  );
}
