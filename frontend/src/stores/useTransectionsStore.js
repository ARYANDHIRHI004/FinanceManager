import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../services/axios";

const useTransectionsStore = create((set) => ({
  transections: [],
  isGettingTransections: false,

  getTransections: async (accountId) => {
    try {
      set({ isGettingTransections: true });
      const res = await axiosInstance.get(`/transections/get-all-category-transection/${accountId}`);
      set({ isGettingTransections: false, transections: res.data.data });
      toast.success(res.data.message)
    } catch (error) {
      toast.error("Error while getting transections");
    }
  },
}));

export default useTransectionsStore;
