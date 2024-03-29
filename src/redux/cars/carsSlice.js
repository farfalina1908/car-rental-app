import { createSlice } from '@reduxjs/toolkit';
import { fetchCarsThunk, fetchLoadMoreCarsThunk } from './carsOperation';

const initialState = {
  allCars: [],
  error: false,
  isLoading: false,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCarsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allCars = action.payload;
      })
      .addCase(fetchCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchLoadMoreCarsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchLoadMoreCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allCars = [...state.allCars, ...action.payload];
      })
      .addCase(fetchLoadMoreCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const carsReducer = carsSlice.reducer;