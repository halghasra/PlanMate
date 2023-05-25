import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material'
import { LogoSecondary } from '../theme/Logos'

const Header = ({ onOpen }) => {
    return (
        <AppBar position="fixed" color="primary" sx={{ width: '100%' }}>
            <Toolbar>
                <IconButton color ="inherit" onClick={onOpen} edge="start">
                    <Menu />
                </IconButton>
                <Box component="span" sx={{ flexGrow: 1 }}>
                    <img src={LogoSecondary} alt="PlanMate logo" height="50" />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;