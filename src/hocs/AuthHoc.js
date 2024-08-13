import {
  Favorite,
  Home,
  Message,
  Person,
  PostAdd,
  Search,
  ArrowBack,
  Settings,
  MessageRounded,
  MessageTwoTone,
  HomeMax,
  SendAndArchive,
  PlusOne,
  HdrPlus,
  Add,
  Person2,
  Person3,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { iconsColor } from 'src/utils/colors';
import { HOME_ROUTE, POST_LIST_PAGE, PROFILE_PAGE, SEARCH_PAGE, SETTINGS_PAGE } from 'src/utils/routeNames';
import logoLong from 'src/assets/images/logo-long.png';

export const AuthHoc = ({ noNav, noHeader, backHeader, pageValue, rightIcon = 'message', ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
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
  const onGoBack = () => navigate(-1);
  const onGoToSettings = () => navigate(SETTINGS_PAGE);

  if (isSuccess) {
    return (
      <div className="flex flex-col flex-1 h-full overflow-x-hidden">
        {backHeader && (
          <header
            className={`h-[50px] p-4 flex items-center transition-transform duration-300 ${
              showHeader ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <ArrowBack onClick={onGoBack} />
            <p className="ml-4 text-xl font-bold">{backHeader}</p>
          </header>
        )}
        {!noHeader && (
          <header
            className={`h-[50px] p-4 flex items-center justify-between transition-transform duration-300 ${
              showHeader ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <img className="object-contain w-[120px] h-[40px]" src={logoLong} />
            {rightIcon === 'message' && <MessageTwoTone />}
            {rightIcon === 'settings' && <Settings onClick={onGoToSettings} />}
          </header>
        )}
        <div className="flex-1 overflow-auto flex flex-col overflow-x-hidden">
          <div key={location.pathname} className="slideIn flex-1 flex flex-col w-full">
            {props.children}
          </div>
        </div>
        {!noNav && (
          <BottomNavigation
            showLabels={false}
            value={pageValue}
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
            <BottomNavigationAction onClick={() => onChangeNav(POST_LIST_PAGE)} label="Home" icon={<HomeMax />} />
            <BottomNavigationAction onClick={() => onChangeNav(SEARCH_PAGE)} label="Search" icon={<SendAndArchive />} />
            <BottomNavigationAction label="Post" icon={<Add />} />
            <BottomNavigationAction label="Likes" icon={<Favorite />} />
            <BottomNavigationAction onClick={() => onChangeNav(PROFILE_PAGE)} label="Profile" icon={<Person2 />} />
          </BottomNavigation>
        )}
      </div>
    );
  }

  return <FullLoading />;
};
