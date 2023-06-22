import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  materials: [],
  loading: false,
  error: null,
};

export const getMaterials = createAsyncThunk(
  "materials/getMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/materials");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const newMaterial = createAsyncThunk(
  "materials/newMaterial",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/materials",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const deleteMaterials = createAsyncThunk(
  "materials/deleteMaterials",
  async (materialId, { rejectWithValue }) => {
    try {
      return axios
        .delete(`http://127.0.0.1:8000/api/materials/${materialId}`)
        .then((resp) => resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateMaterial = createAsyncThunk(
  "material/updateMaterial",
  async ({ materialId, data }, { rejectWithValue }) => {
    try {
      return axios
        .put(`http://127.0.0.1:8000/api/materials/${materialId}`, data)
        .then((resp) => resp.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMaterials.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getMaterials.fulfilled, (state, action) => {
      (state.materials = action.payload), (state.loading = false);
      state.error = null;
    });
    builder.addCase(newMaterial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(newMaterial.fulfilled, (state, action) => {
      state.materials = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteMaterials.fulfilled, (state, action) => {
      state.materials = action.payload;
      state.loading = false;
    });
    builder.addCase(updateMaterial.fulfilled, (state, action) => {
      state.materials = action.payload;
      state.loading = false;
    });
  },
});

export default materialsSlice.reducer;
