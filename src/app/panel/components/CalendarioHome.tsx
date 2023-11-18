import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import theme from '@/theme'
import { Box } from '@mui/material'

export default function CalendarioHome(): JSX.Element {
  return (
    <Box 
    sx={{ 
      '& .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {background: theme.palette.primary.main }
     }}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{
          calendarWeekNumberHeaderText: '#',
          calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
        }}
      >
        <DateCalendar
          className="customDay"
          sx={{ 
            '& .css-jgls56-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': { background: theme.palette.primary.main }
          }}
          displayWeekNumber
        />
      </LocalizationProvider>
    </Box>
  )
}
