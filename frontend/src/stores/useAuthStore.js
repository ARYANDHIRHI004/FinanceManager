import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    authUser: null,
    isLoggingIn: false,

    loginUser : async (data) => {
      try {
        set({isLoggingIn: true})
        const res = await axiosInstance.post("/auth/loginUser", data)
        toast.success(res.data.message)
        set({isLoggingIn: false, authUser: res.data?.data})
    } catch (error) {
        set({isLoggingIn: false})
        toast.error(res.data.message || "Error while logging in")
      }
    },

    getCurrentUser : async () => {
      try {
        set({isLoggingIn: true})
        const res = await axiosInstance.get("/auth/get-current-user")
        toast.success(res.data.message)
        set({isLoggingIn: false, authUser: res.data?.data})
    } catch (error) {
        set({isLoggingIn: false})
        toast.error(res.data.message || "Error while logging in")
      }
    }
    

}))

export default useAuthStore