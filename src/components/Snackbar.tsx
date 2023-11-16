import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, CircularProgress, type AlertColor } from '@mui/material'

interface ISimpleSnackbarProps {
  message: string
  severity: AlertColor | 'loading'
  autoHideDuration?: number | null
  snackBarActive: boolean
  setSnackBarActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SimpleSnackbar({
  message,
  severity,
  snackBarActive,
  setSnackBarActive,
  autoHideDuration = null
}: ISimpleSnackbarProps): JSX.Element {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return
    }

    setSnackBarActive(false)
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <Snackbar
      open={snackBarActive}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      action={action}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {severity === 'loading' ? (
        <Alert
          onClose={handleClose}
          severity={'info'}
          icon={<CircularProgress size={16} color="info" />}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  )
}
