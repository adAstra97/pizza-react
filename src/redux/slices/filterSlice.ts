import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  categoryId: number;
  sort: {
    name: string;
    sortBy: string;
  };
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortBy: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
