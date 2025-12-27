import { createSlice } from "@reduxjs/toolkit";

const initialGuestState = {
  cart:  [],
  favorites: [],
  orders: [],
  info: {},
};

export const cartSlice = createSlice({
  name: "userCart",
  initialState: initialGuestState,
  reducers: {
    addToCart(state, action) {
      state.cart = action.payload;
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    plusQuantity(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },
    minusQuantity(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          item.quantity--;
        }
        return item;
      });
    },
    clearCart(state) {
      state.cart = [];
    },
    addToFavorites(state, action) {
      state.favorites = action.payload;
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    addToOrders(state, action) {
      state.orders = action.payload;
    },
    addInfo(state, action) {
      state.info = action.payload;
    },
  },
});

export const guestActions = cartSlice.actions;
