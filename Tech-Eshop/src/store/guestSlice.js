import { createSlice } from "@reduxjs/toolkit";
import { saveCartStorage, saveFavoritesStorage } from "../utils/localeStorage";


const initialGuestState = {
  cart: JSON.parse(sessionStorage.getItem("cart")) || [],
  favorites: JSON.parse(sessionStorage.getItem("favorites")) || [],
};

export const guestSlice = createSlice({
  name: "guest",
  initialState: initialGuestState,
  reducers: {
    addToCart(state, action) {
      state.cart = action.payload;
      saveCartStorage(state.cart);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      saveCartStorage(state.cart);
    },
    addToFavorites(state, action) {
      state.favorites = action.payload;     
      saveFavoritesStorage(state.favorites);
      
    },
    removeFromFavorites(state, action) {
      state.favorites = state.cart.filter((item) => item.id !== action.payload.id);
      saveFavoritesStorage(state.favorites);
    },
  },
});


export const guestActions = guestSlice.actions;