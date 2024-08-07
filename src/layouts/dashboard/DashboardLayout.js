import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { Breadcrumbs, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout(props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <StyledRoot>
      {!props.noHeader && <Header onOpenNav={() => setOpen(true)} />}

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        {props.isLoading ? (
          <FullLoading />
        ) : (
          <Container maxWidth="xl">
            {/* {!props.hideBreadcrumbs && (
              <Breadcrumbs className="mb-4" aria-label="breadcrumb">
                {props?.breadcrumbs
                  ? props?.breadcrumbs.map((item) => <Typography color="text.primary">{item}</Typography>)
                  : location.pathname.split('/').map((item) => <Typography color="text.primary">{item}</Typography>)}
              </Breadcrumbs>
            )} */}
            {props.children}
          </Container>
        )}
      </Main>
    </StyledRoot>
  );
}
