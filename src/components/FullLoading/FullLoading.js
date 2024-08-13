import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import './fullLoading.css';

export const FullLoading = () => {
  return (
    <div
      className="justify-center items-center flex overflow-hidden flex-col"
      style={{ height: window.innerHeight - 10, width: window.innerWidth - 10 }}
    >
      <div class="spinner"></div>
      <Typography variant="h4" sx={{ px: 5, mt: 3, mb: 5 }}>
        Loading
      </Typography>
    </div>
  );
};
