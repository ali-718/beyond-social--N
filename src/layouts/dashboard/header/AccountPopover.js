import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from 'src/redux/AuthRedux';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE, STUDENT_HOME_PAGE, TEACHERS_DASHBOARD_PAGE } from 'src/utils/routeNames';
import photoUrl from 'src/assets/images/person_placeholder.png';

export default function AccountPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const user = useSelector((state) => state.user.user);
  const { mode, privacy } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate(HOME_ROUTE);
    handleClose();
  };

  const handleGoToDashboard = (mode) => {
    if (user?.Role === 2) {
      navigate(STUDENT_HOME_PAGE);
      return;
    }
    navigate(TEACHERS_DASHBOARD_PAGE);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar className="border-yellow-300 border" src={user?.profilePicture || photoUrl} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.Name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.RoleName}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={handleGoToDashboard} sx={{ m: 1 }}>
          Dashboard
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
