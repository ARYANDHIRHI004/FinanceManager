import { Loader2Icon, LogOutIcon } from "lucide-react";
import React from "react";
import useAuthStore from "../stores/useAuthStore";

const LogoutBtn = ({open}) => {

    const {isLoggingOut, logOutUser} = useAuthStore()

  return (
    <button
      onClick={logOutUser}
      className="bg-[#6f00ff] text-white rounded-lg flex justify-center items-center h-12"
    >
      {isLoggingOut ? <Loader2Icon className="animate-spin" size={15} /> : open?"Logout":<LogOutIcon size={14}/>}
    </button>
  );
};

export default LogoutBtn;
