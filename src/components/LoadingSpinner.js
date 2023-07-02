/**
 * @desc: This component is used to display a loading spinner.
 * It uses the CircularProgress component from Material UI to create a loading spinner.
 * The component is rendered when there is a loading state in the application.
 * @return {JSX} Return the loading spinner component
 */
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// Render the circular progress component from MUI
const LoadingSpinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width:'100%', position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
            <CircularProgress />
        </div>
    );
};

export default LoadingSpinner;