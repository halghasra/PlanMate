import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box py={3} textAlign="center" color="text.secondary" bgcolor="background.paper" sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <Typography variant="body2">Designed by Husain M. Alghasrah for IU Project Java & WebApp Development</Typography>
        </Box>
    );
};

export default Footer;