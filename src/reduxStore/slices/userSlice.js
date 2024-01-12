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
    updateUserImage:(state,action)=>{
     
        state.user.profileImage = action.payload;
      
    }
  },
});

export const { userLogin, userLogout,updateUserImage } = userSlice.actions;

export default userSlice.reducer;
