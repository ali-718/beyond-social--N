import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/AuthRedux';
import alertReducer from './redux/AlertRedux';
import socketReducer from './redux/socketRedux';
import themeReducer from './redux/themeRedux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    socket: socketReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
