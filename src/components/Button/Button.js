import { LoadingButton } from '@mui/lab';
import React from 'react';
import { primaryColor } from 'src/utils/colors';

export const Button = ({
  isLoading,
  handleSubmit,
  text,
  className,
  isRed,
  disabled,
  hoverColor,
  size = 'large',
  isBlue,
  bg,
  ...props
}) => {
  const primary = `bg-[${primaryColor}] text-black`;
  const buttonClass = `${bg ? bg : isRed ? 'bg-red-500' : isBlue ? 'bg-blue-500' : primary} focus:${
    bg ? bg : isRed ? 'bg-red-500' : isBlue ? 'bg-blue-500' : primary
  } ${className}`;

  return (
    <LoadingButton
      disabled={disabled}
      loading={isLoading}
      className={buttonClass}
      fullWidth
      size={size}
      type="submit"
      variant="contained"
      onClick={handleSubmit}
      {...props}
    >
      {text}
    </LoadingButton>
  );
};
