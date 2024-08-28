import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  notifications: [],
  messageList: [],
  isSeen: false,
  notsLoading: true,
  messageLoading: true,
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setMessageListAction: (state, action) => {
      state.messageList = action.payload;
      state.messageLoading = false;
      state.isSeen = action.payload ? action?.payload?.find((item) => !item?.isSeen)?.id : false;
    },
    setNotificationsAction: (state, action) => {
      state.notifications = action.payload;
      state.notsLoading = false;
    },
    loginUserAction: (state, action) => {
      state.user = action.payload;
    },
    logoutUserAction: (state) => {
      localStorage.clear('userToken');
      localStorage.clear('user');
      state.user = {};
    },
  },
});

export const { loginUserAction, logoutUserAction, setNotificationsAction, setMessageListAction } = userReducer.actions;

export default userReducer.reducer;
