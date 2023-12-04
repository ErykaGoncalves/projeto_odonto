import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a783fa',
      light: '#B997FA',
      dark: '#3D305C'
    },
    secondary: {
      main: '#c91303',
      light: '#C91303',
      dark: '#8c0d02'
    },
    error: {
      main: '#c91303',
      light: '#c91303',
      dark: '#8c0d02'
    },
    success: {
      main: '#12F980'
    },
    warning: {
      main: '#FFAA0D',
      light: '#FFAA0D',
      dark: '#ff5d00'
    },
    info: {
      main: '#82ABFA'
    }
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h3: {
      fontSize: 40,
      lineHeight: 1.2
    },
    subtitle1: {
      fontSize: 15,
      lineHeight: 1.3
    },
    body1: {
      fontSize: 15,
      lineHeight: 1.3
    }
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#000000'
          },
          '& .MuiInputBase-input': {
            color: '#000000',
            '&::before': {
              content: 'unset'
            }
          },
          '& .MuiInput-underline:before, & .MuiInput-underline:after': {
            borderBottomColor: '#000000'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&.Mui-disabled': {
            opacity: 1,
            '-webkit-text-fill-color': '#000000'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-disabled': {
            color: '#000000'
          }
        }
      }
    }
  }
});

export default theme;
