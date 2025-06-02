import { createSlice } from "@reduxjs/toolkit";


const initialFilterState = { categoryFilter: null, subCategoryFilter: null, min: null, max: null, sale: false, search: ''};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    setCategory(state, action) {
      state.categoryFilter = action.payload;
    },
    setSubCategory(state, action) {
      state.subCategoryFilter = action.payload;
    },
    setMin(state, action) {
      state.min = action.payload;
    },
    setMax(state, action) {
      state.max = action.payload;
    },
    onSale(state, action) {
      state.sale = action.payload
    },
    search(state, action) {
      state.search = action.payload;
    },
    clear(state) {
      state.min = null;
      state.max = null;
      state.categoryFilter = null;
      state.subCategoryFilter = null;
      state.sale = false;
    }
  },
  
});

console.log(initialFilterState);


export const filterActions = filterSlice.actions;
