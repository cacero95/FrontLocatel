import { createTheme } from '@mui/material/styles'
import { esES } from '@mui/material/locale';

export const theme = createTheme ({

    palette: {
        primary: {
            main: '#01579b'
        },
        error: {
            main: '#ef5350'
        },
        success: {
            main: '#4caf50'
        },
        secondary: {
            main: '#ffeb3b'
        },
    },
    typography: {
        fontSize: 11,
    }

}, esES )