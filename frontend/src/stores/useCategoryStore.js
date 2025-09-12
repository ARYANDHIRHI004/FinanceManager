import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const useCategoryStore = create((set) => ({
  categories: [],
  isGettingCategories: false,

  getCategory: async (accountId) => {
    try {
      set({ isGettingCategories: true });
      const res = await axiosInstance.get(`/categories/get-categories/${accountId}`);
      set({ isGettingCategories: false, categories: res.data.data });
    } catch (error) {
      toast.error("Error while getting categories");
    }
  },
}));

export default useCategoryStore;
