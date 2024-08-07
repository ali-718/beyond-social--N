import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import Router from './routes';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';
import { store } from './store';
import './App.css';
import { Alerts } from './components/Alerts/Alerts';
import { useEffect } from 'react';
import { loginUserAction, logoutUserAction } from './redux/AuthRedux';
import { FETCH_PROFILE_DETAILS } from './config/Apis';
import { client } from './config/client';
import { changePrivacy } from './redux/themeRedux';

export default function App() {
  useEffect(() => {
    const user = localStorage.getItem('user');
    const userId = JSON.parse(user)?.id;
    console.log({ userId });
    if (userId) {
      client?.get(FETCH_PROFILE_DETAILS({ userId: userId })).then((res) => {
        const data = res.data?.data;
        if (userId === 84) {
          store.dispatch(changePrivacy('private'));
        }
        if (data?.isDisabled) {
          store.dispatch(logoutUserAction());
          localStorage.clear();
          return;
        }
        if (data != null) {
          store.dispatch(loginUserAction(data));
          localStorage.setItem('user', JSON.stringify(data));
        }
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider>
          <StyledChart />
          <Router />
          <Alerts />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  );
}
