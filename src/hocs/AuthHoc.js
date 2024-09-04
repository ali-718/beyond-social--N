import { Favorite, Home, Message, Person, PostAdd, Search, ArrowBack, Settings } from '@mui/icons-material';
import { Badge, BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { iconsColor } from 'src/utils/colors';
import {
  HOME_ROUTE,
  MESSAGE_LIST,
  POST_LIST_PAGE,
  PROFILE_PAGE,
  SEARCH_PAGE,
  SETTINGS_PAGE,
  POST_PAGE,
  NOTIFICATIONS_LIST,
} from 'src/utils/routeNames';
import logoLong from 'src/assets/images/logo-long.png';
import { fetchMessageList, getUserNotifications } from 'src/Firebase Functions/ReadDocument';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageListAction, setNotificationsAction } from 'src/redux/AuthRedux';

export const AuthHoc = ({ noNav, noHeader, backHeader, pageValue, rightIcon = 'message', ...props }) => {
  const localUser = retrieveUser();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(1);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const isSeen = useSelector((state) => state.user.isSeen);

  useEffect(() => {
    const user = retrieveUser();
    if (user !== '') {
      setIsSuccess(true);
      return;
    }
    navigate(HOME_ROUTE);
  }, [navigate]);

  useEffect(() => {
    getUserNotifications({ userId: localUser?.id }).then((data) => {
      const nots = localStorage.getItem('notificationsCount')
        ? parseInt(localStorage.getItem('notificationsCount'))
        : 0;
      const serverNots = data?.length;
      var actualNots = 0;
      if (serverNots > nots) {
        actualNots = serverNots - nots;
      }
      setNotificationsCount(actualNots);
      dispatch(setNotificationsAction(data));
      localStorage.setItem('notificationsCount', data.length);
    });

    setInterval(() => {
      getUserNotifications({ userId: localUser?.id }).then((data) => {
        const nots = localStorage.getItem('notificationsCount')
          ? parseInt(localStorage.getItem('notificationsCount'))
          : 0;
        const serverNots = data?.length;
        var actualNots = 0;
        if (serverNots > nots) {
          actualNots = serverNots - nots;
        }
        setNotificationsCount(actualNots);
        dispatch(setNotificationsAction(data));
      });
    }, 5000);

    // messages
    fetchMesageList();
    setInterval(() => {
      fetchMesageList();
    }, 3000);
  }, []);

  const fetchMesageList = () => {
    fetchMessageList({ senderId: localUser?.id }).then((data) => {
      dispatch(setMessageListAction(data));
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setShowHeader(scrollPosition > currentScrollPosition || currentScrollPosition < 10);
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const onChangeNav = (name) => navigate(name);
  const onGoBack = () => navigate(-1);
  const onGoToSettings = () => navigate(SETTINGS_PAGE);
  const onGoToMessageList = () => navigate(MESSAGE_LIST);

  const _messageIcon = (
    <Badge badgeContent={isSeen ? ' ' : null} color="warning">
      <Message onClick={onGoToMessageList} />
    </Badge>
  );

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
            {rightIcon === 'message' && _messageIcon}
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
            <BottomNavigationAction onClick={() => onChangeNav(POST_LIST_PAGE)} label="Home" icon={<Home />} />
            <BottomNavigationAction onClick={() => onChangeNav(SEARCH_PAGE)} label="Search" icon={<Search />} />
            <BottomNavigationAction onClick={() => onChangeNav(POST_PAGE)} label="Post" icon={<PostAdd />} />
            <BottomNavigationAction
              onClick={() => onChangeNav(NOTIFICATIONS_LIST)}
              label="Notifications"
              icon={
                notificationsCount > 0 ? (
                  <Badge badgeContent={notificationsCount} color="warning">
                    <Favorite />
                  </Badge>
                ) : (
                  <Favorite />
                )
              }
            />
            <BottomNavigationAction onClick={() => onChangeNav(PROFILE_PAGE)} label="Profile" icon={<Person />} />
          </BottomNavigation>
        )}
      </div>
    );
  }

  return <FullLoading />;
};
