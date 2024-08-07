import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, Divider, FormLabel, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useSelector } from 'react-redux';
import { DRIVER_NEW_INVOICE, DRIVER_PREVIOUS_INVOICE, REPORTS_PROFIT_BY_TRUCK } from 'src/utils/routeNames';
import SvgColor from '../svg-color/SvgColor';
import { changeTheUser } from 'src/hooks/AuthHooks/AuthHooks';
import { userAlters } from 'src/utils/userAlters';
import { iconsColor, primaryColor } from 'src/utils/colors';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export default function NavSection({ data = [], ...other }) {
  const user = useSelector((state) => state.user.user);
  const mapper = [...new Set([...data].map((item) => item.heading))];
  const findUser = userAlters.find((item) => item?.username === user?.username);

  const switchToAdmin = {
    title: 'Switch To Admin',
    path: '/',
    icon: icon('ic_twoway'),
    onClick: () => changeTheUser(findUser.username ? { username: findUser.altUser, password: findUser.password } : {}),
  };

  const switchToDriver = {
    title: 'Switch To Driver',
    path: '/',
    icon: icon('ic_twoway'),
    onClick: () => changeTheUser(findUser.username ? { username: findUser.altUser, password: findUser.password } : {}),
  };

  const reportByTruck = {
    title: 'Report ByTruck',
    path: REPORTS_PROFIT_BY_TRUCK,
    icon: icon('ic_twoway'),
  };

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {mapper.map((item, i) => (
          <div className="pl-2 pt-1">
            <div className="pt-2" />
            {[...data]
              .filter((snap) => snap.heading === item)
              .map((snaps, index) => (
                <>
                  <div className="pl-2">
                    <NavItem key={snaps.title} item={snaps} />
                    <Divider className="mb-2" />
                  </div>
                </>
              ))}
          </div>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info, onClick } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: iconsColor,
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
      onClick={onClick}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
