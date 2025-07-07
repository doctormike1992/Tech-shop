import { createSlice } from "@reduxjs/toolkit";
import { saveUserStorage, saveUserUIDStorage } from "../utils/localeStorage";


const initialUserState = {
  userInfo: null,
  isLoggedIn: false,
  userUID: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    getUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    userLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
      saveUserStorage(state.isLoggedIn);
    },
    userId(state, action) {
      state.userUID = action.payload;
      saveUserUIDStorage(state.userUID);
    },
  },
});


export  const userActions = userSlice.actions;