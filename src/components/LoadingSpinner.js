import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width:'100%', position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
            <CircularProgress />
        </div>
    );
};

export default LoadingSpinner;