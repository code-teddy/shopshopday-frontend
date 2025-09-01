import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, privateApi } from "../../component/services/api";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("quantity", quantity);
      const { data } = await privateApi.post("/cartItems/item/add", formData);

      // Ensure a stable payload shape
      return {
        item: data?.item ?? data,
        message: data?.message ?? "Added to cart",
      };
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add to cart";
      return rejectWithValue(msg);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (userId) => {
    const response = await api.get(`/carts/user/${userId}/cart`);
    return response.data.data;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, itemId, newQuantity }) => {
    await api.put(
      `/cartItems/cart/${cartId}/item/${itemId}/update?quantity=${newQuantity}`
    );
    return { itemId, newQuantity };
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ cartId, itemId }) => {
    await api.delete(`/cartItems/cart/${cartId}/item/${itemId}/remove`);
    return itemId;
  }
);

const initialState = {
  items: [],
  cartId: null,
  totalAmount: 0,
  isLoading: true,
  isAdding: false,   
  errorMessage: null,
  successMessage: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
        clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
          .addCase(addToCart.pending, (state) => {
        state.isAdding = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isAdding = false;
        const { item, message } = action.payload;
        if (item) state.items.push(item);
        state.successMessage = message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isAdding = false;
        state.errorMessage = action.payload || action.error.message;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.cartId = action.payload.cartId;
        state.totalAmount = action.payload.totalAmount;
        state.errorMessage = null;
        state.isLoading = false;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { itemId, newQuantity } = action.payload;
        const item = state.items.find((item) => item.product.id === itemId);
        if (item) {
          item.quantity = newQuantity;
          item.totalPrice = item.product.price * newQuantity;
        }
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const itemId = action.payload;
        state.items = state.items.filter((item) => item.product.id !== itemId);
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      });
  },
});

export const { clearCart, clearMessages } = cartSlice.actions;

export default cartSlice.reducer;
