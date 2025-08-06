import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../component/services/api";

export const uploadImages = createAsyncThunk(
  "image/uploadImages",
  async ({ productId, files }) => {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", files);
    }

    formData.append("productId", productId);
    const response = await api.post("/images/upload", formData);
    return response.data;
  }
);

const initialState = {};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (buider) => {},
});

export default imageSlice.reducer;
