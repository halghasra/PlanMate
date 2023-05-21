import { createTheme } from "@mui/material";
import { lighten } from "@mui/system";
import Colours from "./Colours";

const theme = createTheme({
    palette: {
        primary: {
            main: Colours.purple,
            light: lighten(Colours.purple, 0.2) // this creates a lighter version of the colour used for effect 
        },
        secondary: {
            main: Colours.yellow,
            light: lighten(Colours.yellow, 0.2)
        },
        info: {
            main: Colours.cyan,
            light: lighten(Colours.yellow, 0.2)
        },
        error: {
            main: Colours.red,
            light: lighten(Colours.red, 0.2)
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    transition: '0.3s',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                    },
                },
            },
        },
    },
});

export default theme;