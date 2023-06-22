import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const newOrder = createAsyncThunk(
  "orders/newOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      return axios
        .delete(`http://127.0.0.1:8000/api/orders/${orderId}`)
        .then((resp) => resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderId, data }, { rejectWithValue }) => {
    try {
      return axios
        .put(`http://127.0.0.1:8000/api/orders/${orderId}`, data)
        .then((resp) => resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(newOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(newOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
  },
});

export default ordersSlice.reducer;
