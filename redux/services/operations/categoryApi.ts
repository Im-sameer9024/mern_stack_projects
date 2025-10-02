import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { categoryEndpoints } from "../apis";

const { GET_ALL_CATEGORIES } = categoryEndpoints;

export const GetAllCategories = createAsyncThunk(
  "category/GetAllCategories",
  async (_, { rejectWithValue, dispatch }) => {
    const toastId = toast.loading("Fetching categories...");

    try {
      const response = await apiConnector({
        method: "GET",
        url: GET_ALL_CATEGORIES,
      });

      console.log("response of categories api", response);

      if (response.data?.success) {
        toast.success("Categories fetched successfully!", {
          id: toastId,
          duration: 3000,
        });
        return response.data?.data;
      } else {
        toast.error(response.data?.message || "Could not fetch categories!", {
          id: toastId,
          duration: 3000,
        });
        return rejectWithValue(
          response.data?.message || "Could not fetch categories!"
        );
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }
);
