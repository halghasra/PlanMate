/**
 * @desc This component represents the footer section of the application.
 * It uses the Box and Typography components from Material UI to create a footer with a text message.
 * The component is fixed at the bottom of the page and spans the entire width.
 * @return {JSX} Return the footer component
 */

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