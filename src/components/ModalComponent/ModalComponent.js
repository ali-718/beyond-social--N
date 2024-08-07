import { Modal } from '@mui/material';
import React from 'react';
import { Button } from '../Button/Button';
import { useSelector } from 'react-redux';
import { getTheme } from 'src/theme/palette';

export const ModalComponent = ({ open, onClose, className = '', ...props }) => {
  const mode = useSelector((state) => state.theme.mode);
  const palette = getTheme(mode);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div className="flex w-full h-full items-center justify-center">
        <div
          className={`bg-[${palette.background.default}] w-[95%] md:w-[60%] rounded border p-3 max-h-[90%] overflow-y-auto ${className}`}
        >
          {props.children}
          <Button className="mt-3" text={'Cancel'} handleSubmit={onClose} isRed />
        </div>
      </div>
    </Modal>
  );
};
