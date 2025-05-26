import { createSlice } from "@reduxjs/toolkit";


const initialProductsState = { products: [] };

export const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    setProducts(state, action) {
      state.products = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
    },
  },
});

export const productsActions = productsSlice.actions;