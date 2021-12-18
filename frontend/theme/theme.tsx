import {createTheme} from "@mui/material";
import {lightBlue, red} from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[400]
    },
    secondary: {
      main: lightBlue[400]
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 12,
          '&.Mui-error': {
            "& svg": {
              fill: red[400]
            }
          },
          '&.Mui-focused': {
            "& svg": {
              fill: lightBlue[400]
            }
          },
        },
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingBottom: 0
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: 14,
          fontWeight: 400
        },
        h6: {
          fontSize: 12,
          fontWeight: 400
        },
        h5: {
          fontSize: 14,
          fontWeight: 400
        },
        h4: {
          fontSize: 18,
          fontWeight: 600
        }
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: 12
        }
      }
    },
    // @ts-ignore
    MuiLoadingButton: {
      styleOverrides: {
        startIconLoadingStart: {
          display: 'none'
        },
        loadingIndicator: {
          display: 'inherit',
          position: 'relative',
          left: 0,
          marginRight: '8px',
          marginLeft: '-2px'
        }
      }
    }
  }
})
