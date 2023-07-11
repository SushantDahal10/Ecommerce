// productsActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    try {
      // Make a DELETE request to the API endpoint
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the request is successful, dispatch the deleteProductSuccess action
        dispatch(deleteProductSuccess(id));
        toast("Product deleted successfully");
      } else {
        toast("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred while deleting the product");
    }
  }
);

export const deleteProductSuccess = (id) => ({
  type: "product/deleteProductSuccess",
  payload: id,
});
