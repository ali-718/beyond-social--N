import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onCloseAlertAction } from 'src/redux/AlertRedux';

export const Alerts = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [open, setOpen] = useState(false);
  const timeRef = useRef();

  useEffect(() => {
    clearTimeout(timeRef.current);
    if (alert.alertMessage) {
      setOpen(false);
      setOpen(true);
      timeRef.current = setTimeout(() => {
        setOpen(false);
        onClose();
      }, 5000);
    }
  }, [alert, dispatch]);

  const onClose = () => {
    dispatch(onCloseAlertAction());
    setOpen(false);
  };

  return (
    <Snackbar open={open} onClose={onClose}>
      <Alert
        variant="outlined"
        onClose={onClose}
        severity={alert.type}
        sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
      >
        {alert.alertMessage}
      </Alert>
    </Snackbar>
  );
};
