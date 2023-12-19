import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userLogout: (state) => {
      state.user = null;
      state.token = '';
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
