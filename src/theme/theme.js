import { createTheme } from "@mui/material";
import Colours from "./Colours";

const theme = createTheme({
    palette: {
        purple: {
            main: Colours.purple,
        },
        yellow: {
            main: Colours.yellow,
        },
        cyan: {
            main: Colours.cyan,
        },
        red: {
            main: Colours.red,
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
                        backgroundColor: Colours.purple, // This adds a lighter shade of purple to the background
                    },
                },
            },
        },
    },
});

export default theme;