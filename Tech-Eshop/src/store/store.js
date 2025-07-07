import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { filterSlice } from "./filterSlice";
import { guestSlice } from "./guestSlice";
import { userSlice } from "./userSclice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    filter: filterSlice.reducer,
    guest: guestSlice.reducer,
    user: userSlice.reducer, 
  },
});

export default store;
