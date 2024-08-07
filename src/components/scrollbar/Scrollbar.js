import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

function Scrollbar({ children, sx, ...other }) {
  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
