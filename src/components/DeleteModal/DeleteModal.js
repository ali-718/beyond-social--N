import React from 'react';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { Typography } from '@mui/material';
import { Button } from '../Button/Button';

export const DeleteModal = ({ open, onClose, name, isLoading, handleSubmit, text, buttonText }) => {
  return (
    <ModalComponent open={open} onClose={onClose}>
      <Typography variant="h5" component="h2">
        Warning
      </Typography>
      {text}
      {!text && (
        <p>
          Once the <strong>{name}</strong> is deleted this action cannot be undone!
        </p>
      )}
      <Button
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        className={'mt-4'}
        text={buttonText || 'Yes, delete it'}
      />
    </ModalComponent>
  );
};
