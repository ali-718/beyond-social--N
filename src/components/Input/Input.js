import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      color: 'black', // Change the text color if needed
    },
    '& .MuiFormLabel-root': {
      color: 'black', // Change the label color
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'black', // Change the underline color
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'black', // Change the underline color on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black', // Change the underline color when focused
    },
  },
}));

export const Input = ({
  maxLength,
  name,
  label,
  register,
  error = {},
  required = false,
  textarea,
  isAmount,
  type,
  setValue,
  pattern,
  ...props
}) => {
  const errorText = error?.[name]?.type === 'required' ? 'Field is required' : error?.[name]?.message;
  const classes = useStyles();

  if (isAmount) {
    return (
      <FormControl className={classes.root}>
        <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>

        <OutlinedInput
          className="w-full"
          helperText={errorText}
          error={!!error?.[name]?.type}
          name={name}
          label={label}
          minRows={textarea && 3}
          multiline={textarea}
          InputLabelProps={{ shrink: true }}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          type={type}
          {...register(name, { required, maxLength: { value: maxLength, message: 'Max Length is 6' } })}
          {...props}
        />
        {errorText && <FormHelperText className="text-red-500">{errorText}</FormHelperText>}
      </FormControl>
    );
  }
  if (type === 'tel') {
    return (
      <FormControl className="w-full">
        <PhoneInput
          inputStyle={{ width: '100%', background: 'transparent' }}
          country={'au'}
          className="w-full"
          helperText={errorText}
          error={!!error?.[name]?.type}
          name={name}
          label={label}
          minRows={textarea && 3}
          multiline={textarea}
          InputLabelProps={{ shrink: true }}
          type={type}
          {...register(name, { required })}
          {...props}
          onChange={(val) => setValue(name, val)}
        />
        {errorText && <FormHelperText className="text-red-500">{errorText}</FormHelperText>}
      </FormControl>
    );
  }
  return (
    <TextField
      className="w-full"
      helperText={errorText}
      error={!!error?.[name]?.type}
      name={name}
      label={label}
      minRows={textarea && 3}
      multiline={textarea}
      InputLabelProps={{ shrink: true }}
      type={type}
      {...register(name, {
        required,
        maxLength: { value: maxLength, message: 'Max Length is 6' },
        pattern:
          type === 'email'
            ? {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              }
            : pattern,
      })}
      {...props}
    />
  );
};
