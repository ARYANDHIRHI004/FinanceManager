import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isCheckingAuth: false,

  isLoggingOut: false,
  loginUser: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/loginUser", data);
      toast.success(res.data.message);
      set({ isLoggingIn: false, authUser: res.data?.data });
    } catch (error) {
      set({ isLoggingIn: false });
      toast.error("Error while logging in");
      console.log(error);
    }
  },
  logOutUser: async () => {
    try {
      set({ isLoggingOut: true });
      const res = await axiosInstance.get("/auth/logoutUser");
      toast.success(res.data.message);
      set({ isLoggingOut: false, authUser: null });
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error("Error while logging out");
      console.log(error);
    }
  },

  getCurrentUser: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/get-current-user");
      toast.success(res.data.message);
      set({ isCheckingAuth: false, authUser: res.data?.data });
    } catch (error) {
      set({ isCheckingAuth: false });
      toast.error("Error while getting current user");
    }
  },
}));

export default useAuthStore;
