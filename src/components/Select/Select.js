import { FormControl, FormHelperText, InputLabel, MenuItem, TextField, Select } from '@mui/material';
import React from 'react';

export const SelectComponent = ({
  register = () => null,
  name,
  label,
  list,
  findValue,
  required,
  error,
  saveValue,
  ...props
}) => {
  const errorText = error?.[name]?.type === 'required' ? 'Field is required' : error?.[name]?.message;
  return (
    <FormControl error={!!error?.[name]?.type}>
      <InputLabel id={label}>{label}</InputLabel>

      <Select
        labelId={label}
        id={name}
        label={label}
        renderValue={(value) =>
          findValue
            ? `${list?.find((item) => item?.[saveValue] === value)?.[findValue] || ''}`
            : list?.find((item) => item === value)
        }
        {...register(name, { required })}
        {...props}
      >
        {list?.map((item, index) => (
          <MenuItem key={index} value={saveValue ? item?.[saveValue] : item}>
            {findValue ? item?.[findValue] : item}
          </MenuItem>
        ))}
      </Select>
      {!!error?.[name]?.type && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
