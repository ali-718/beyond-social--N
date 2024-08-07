import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
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

export const { loginUserAction, logoutUserAction } = userReducer.actions;

export default userReducer.reducer;
