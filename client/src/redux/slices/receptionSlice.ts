import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reception: [],
  loading: false,
  error: null,
};

export const getReception = createAsyncThunk(
  "reception/getReception",
  async (_, { rejectWithValue }) => {
    try {
      return axios
        .get(`http://127.0.0.1:8000/api/reception`)
        .then((resp) => resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewReception = createAsyncThunk(
  "reception/addReception",
  async (data, { rejectWithValue }) => {
    try {
      return axios
        .post(`http://127.0.0.1:8000/api/reception`, data)
        .then((resp) => resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReception = createAsyncThunk(
  "reception/deleteReception",
  async (id, { rejectWithValue }) => {
    try {
      return axios
        .delete(`http://127.0.0.1:8000/api/reception/${id}`)
        .then((resp) => resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const receptionSlice = createSlice({
  name: "reception",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewReception.fulfilled, (state, action) => {
      state.reception = action.payload;
    });
    builder.addCase(getReception.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReception.fulfilled, (state, action) => {
      (state.reception = action.payload), (state.loading = false);
    });
    builder.addCase(deleteReception.fulfilled, (state, action) => {
      state.reception = action.payload;
      state.loading = false;
    });
  },
});

export default receptionSlice.reducer;
