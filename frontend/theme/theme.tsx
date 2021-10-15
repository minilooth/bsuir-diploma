import {createTheme} from "@mui/material";
import {lightBlue, red} from "@mui/material/colors";

const muiPrefix = '.Mui-';

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
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: 12
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
      }
    },
  }
})
