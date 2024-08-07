import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  privacy: 'public',
};

export const themeReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    changePrivacy: (state, action) => {
      state.privacy = action.payload;
    },
  },
});

export const { changeMode, changePrivacy } = themeReducer.actions;

export default themeReducer.reducer;
