import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../services/axios";

const useAccountStore = create((set) => ({
  myAccounts: [],
  isGettingAccounts: false,

  getMyAccounts: async () => {
    try {
      set({ isGettingAccounts: true });
      const res = await axiosInstance.get(`/accounts/get-my-accounts`);
      set({ isGettingAccounts: false, myAccounts: res.data.data });
    } catch (error) {
      toast.error("Error while getting accounts");
    }
  },
}));

export default useAccountStore;
