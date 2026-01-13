import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { filterSlice } from "./filterSlice";
import { cartSlice } from "./guestSlice";
import { userSlice } from "./userSclice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    filter: filterSlice.reducer,
    guest: cartSlice.reducer,
    user: userSlice.reducer, 
  },
});

export default store;
