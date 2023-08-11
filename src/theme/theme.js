/**
 * FILEPATH: /Users/husainghasra/VS Projects/PlanMate/src/theme/theme.js
 * This module exports a MUI theme object with custom color palette, typography and button styles.
 * @module theme
 */

import { createTheme } from "@mui/material";
import { lighten } from "@mui/system";
import Colours from "./Colours";

/**
 * The MUI theme object with custom color palette, typography and button styles.
 * @type {Object}
 * @property {Object} palette - The color palette object with primary, secondary, info and error colors.
 * @property {Object} typography - The typography object with fontFamily property.
 * @property {Object} components - The components object with MuiButton styleOverrides property.
 */
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