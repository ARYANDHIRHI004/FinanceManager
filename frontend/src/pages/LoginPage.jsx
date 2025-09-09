import React from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../stores/useAuthStore";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  
  const {loginUser} = useAuthStore()

  const handleLogin = (data) => {
    loginUser(data)
  }
  

  return (
    <div className="flex justify-center items-center h-screen">
      <form action={handleSubmit(handleLogin)}>
        <div className="border-1 border-[#a1a1a1] p-5 rounded-2xl flex flex-col h-100 w-80 gap-5 ">
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              className="border border-[#a1a1a1] rounded-md px-2 py-1"
              type="text"
              {...register("usernameOrEmail")}
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              className="border border-[#a1a1a1] rounded-md px-2 py-1"
              type="password"
              {...register("password")}
              placeholder="Password"
            />
          </div>
          <button
            className="bg-[#120052] h-10 rounded-[50px] text-white"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="bg-[#cf1500] h-10 rounded-[50px] text-white"
            type="submit"
          >
            Login with Google
          </button>
          <button
            className="bg-[#1f1f1f] h-10 rounded-[50px] text-white"
            type="submit"
          >
            Login with GitHub
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
