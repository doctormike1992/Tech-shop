import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import {  filterSlice } from "./filterSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export default store;
