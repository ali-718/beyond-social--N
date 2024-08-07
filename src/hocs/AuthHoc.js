import { Favorite, Home, Message, Person, PostAdd, Search } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { iconsColor } from 'src/utils/colors';
import { HOME_ROUTE, POST_LIST_PAGE, PROFILE_PAGE } from 'src/utils/routeNames';
import logoLong from 'src/assets/images/logo-long.png';

export const AuthHoc = ({ noNav, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [value, setValue] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(1);

  useEffect(() => {
    const user = retrieveUser();
    if (user !== '') {
      setIsSuccess(true);
      return;
    }
    navigate(HOME_ROUTE);
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setShowHeader(scrollPosition > currentScrollPosition || currentScrollPosition < 10);
      setScrollPosition(currentScrollPosition);
      console.log({
        scrollPosition,
        currentScrollPosition,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const onChangeNav = (name) => navigate(name);

  if (isSuccess) {
    return (
      <div className="flex flex-col flex-1 h-full">
        <header
          className={`h-[50px] p-4 flex items-center justify-between transition-transform duration-300 ${
            showHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <img className="object-contain w-[120px] h-[40px]" src={logoLong} />
          <Message />
        </header>
        <div className="flex-1 overflow-auto">
          <div key={location.pathname} className="slideIn flex-1 flex flex-col w-full">
            {props.children}
          </div>
        </div>
        {!noNav && (
          <BottomNavigation
            showLabels={false}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{
              '& .Mui-selected': {
                '& .MuiBottomNavigationAction-label': {
                  fontSize: (theme) => theme.typography.caption,
                  transition: 'none',
                  fontWeight: 'bold',
                  lineHeight: '20px',
                },
                '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                  color: iconsColor,
                },
              },
            }}
          >
            <BottomNavigationAction onClick={() => onChangeNav(POST_LIST_PAGE)} label="Home" icon={<Home />} />
            <BottomNavigationAction label="Search" icon={<Search />} />
            <BottomNavigationAction label="Post" icon={<PostAdd />} />
            <BottomNavigationAction label="Likes" icon={<Favorite />} />
            <BottomNavigationAction label="Profile" icon={<Person />} />
            {/* <BottomNavigationAction onClick={() => onChangeNav(PROFILE_PAGE)} label="Profile" icon={<Person />} /> */}
          </BottomNavigation>
        )}
      </div>
    );
  }

  return <FullLoading />;
};
