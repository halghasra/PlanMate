import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { LogoSecondary } from '../assets/planmate-logo-white.png';
import { Box } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Box component="span" sx={{ flexGrow: 1 }}>
                    <img src={LogoSecondary} alt="Planmate logo" height="50" />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;