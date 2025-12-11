import { createSlice } from "@reduxjs/toolkit";

const initialGuestState = {
  cart:  [],
  favorites: [],
  orders: [],
  orderHistory: [],
  info: [],
};

export const cartSlice = createSlice({
  name: "userCart",
  initialState: initialGuestState,
  reducers: {
    addToCart(state, action) {
      state.cart = action.payload;
    },
    removeFromCart(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart(state) {
      state.cart = []
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
      state.orders =  action.payload;
    },
    removeFromOrders(state, action) {
      state.orders = state.orders.filter(
        (item) => !action.payload.includes(item.id));
    },
    addToOrderHistory(state, action) {
      state.orderHistory.push(...action.payload);
    },
    addInfo(state, action) {
      state.info = action.payload;
    }
  },
});

export const guestActions = cartSlice.actions;
