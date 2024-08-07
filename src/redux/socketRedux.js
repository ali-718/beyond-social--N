import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connection: {},
};

export const socketReducer = createSlice({
  name: 'create',
  initialState,
  reducers: {
    onCreateConnection: (state, action) => {
      state.connection = action.payload;
    },
  },
});

export const { onCreateConnection } = socketReducer.actions;

export default socketReducer.reducer;
