import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { Input } from 'src/components/Input/Input';

export default function LoginForm({ register, error, handleSubmit, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Stack className="mt-5" spacing={3}>
          <Input type="email" required register={register} error={error} name="email" label="Email" />

          <Input
            required
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            register={register}
            error={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <div className="mt-5" />
        <LoadingButton
          loading={isLoading}
          className="bg-green-500"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Login
        </LoadingButton>
      </form>
    </>
  );
}
