import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { Loader2Icon } from "lucide-react";

const Navbar = () => {
  const { authUser, isLoggingOut, logOutUser } = useAuthStore();

  return (
    <div className="flex bg-[#120052] p-5 justify-between text-white items-center">
      <h1 className="text-2xl font-[600] text-white">
        <Link to={"/"}>
          Finance<span className="text-[#ff6600]">Manager</span>
        </Link>
      </h1>
      {!authUser ? (
        <ul className="flex gap-5 text-lg">
          <li>Home</li>
          <li>About</li>
          <li>Pricing</li>
          <li>Services</li>
        </ul>
      ) : (
        ""
      )}
      <div className="flex gap-5">
        <Link
          to={"/login"}
          className="bg-amber-50 text-black px-5 py-2 rounded-[50px]"
        >
          Login
        </Link>
        <Link
          to={"/signup"}
          className="bg-amber-50 text-black px-5 py-2 rounded-[50px]"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
