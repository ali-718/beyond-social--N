import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup as RdGRoup, Typography } from '@mui/material';
import React from 'react';

export const RadioGroup = ({ register, name, required, label, error = {}, toolsRadioGroup = [], ...props }) => {
  const errorText = error?.[name]?.type === 'required' ? 'Field is required' : error?.[name]?.message;
  return (
    <FormControl>
      <Typography className="font-bold" gutterBottom>
        {label}
      </Typography>
      <RdGRoup row {...props}>
        {toolsRadioGroup.map((item) =>
          typeof item === 'object' ? (
            <FormControlLabel
              {...register(name, { required })}
              key={item?.value}
              value={item?.value}
              control={<Radio />}
              label={item?.label}
            />
          ) : (
            <FormControlLabel
              {...register(name, { required })}
              key={item}
              value={item}
              control={<Radio />}
              label={item}
            />
          )
        )}
      </RdGRoup>
      {errorText && <FormHelperText className="text-red-500">{errorText}</FormHelperText>}
    </FormControl>
  );
};
