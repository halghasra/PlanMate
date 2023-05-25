import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { LogoSecondary } from '../theme/Logos'

const Header = () => {
    return (
        <AppBar position="static" color="primary" sx={{ width: '100%' }}>
            <Toolbar>
                <Box component="span" sx={{ flexGrow: 1 }}>
                    <img src={LogoSecondary} alt="PlanMate logo" height="50" />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;