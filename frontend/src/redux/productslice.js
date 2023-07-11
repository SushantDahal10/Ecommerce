import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const fetchProductList = createAsyncThunk(
  "product/fetchProductList",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch product list");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching product list");
    }
  }
);

const initialState = {
  productlist: [],
  CartItem: [],
  isLoading: false,
  error: null,
};

export const productslice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setdataproduct: (state, action) => {
      state.productlist = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    },

    addCartItem: (state, action) => {
      const check = state.CartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Item already in cart");
      } else {
        toast("Item Added Successfully");
        const total = action.payload.price;
        state.CartItem = [
          ...state.CartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    emptyCart: (state) => {
      state.CartItem = []; // Set cartItem to an empty array
    },
    deleteproduct: (state, action) => {
      const id = action.payload;
      state.productlist = state.productlist.filter(
        (product) => product._id !== id
      );
    },
    deleteCartItem: (state, action) => {
      toast("Item deleted successfully");
      state.CartItem = state.CartItem.filter(
        (item) => item._id !== action.payload
      );
    },
    increaseqty: (state, action) => {
      const index = state.CartItem.findIndex((el) => el._id === action.payload);
      let qty = state.CartItem[index].qty;
      const qtyincrease = ++qty;
      state.CartItem[index].qty = qtyincrease;

      const price = state.CartItem[index].price;
      const total = price * qtyincrease;
      state.CartItem[index].total = total;
    },
    decreaseqty: (state, action) => {
      const index = state.CartItem.findIndex((el) => el._id === action.payload);
      let qty = state.CartItem[index].qty;
      const qtydecrease = --qty;
      if (qtydecrease >= 1) {
        state.CartItem[index].qty = qtydecrease;
        const price = state.CartItem[index].price;
        const total = price * qtydecrease;
        state.CartItem[index].total = total;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.productlist = Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload];
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setdataproduct,
  addCartItem,
  deleteCartItem,
  increaseqty,
  decreaseqty,
  deleteproduct,
} = productslice.actions;
export const { emptyCart } = productslice.actions;
export default productslice.reducer;
