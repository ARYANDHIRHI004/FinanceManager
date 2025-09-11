import React, { useState } from "react";
import LogoutBtn from "./logoutBtn";
import { Link } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={` ${
        open ? "w-[17vw]" : "w-[4vw]"
      } bg-[#01003b] h-screen flex flex-col justify-between px-4 py-8 transition-width duration-500`}
    >
      <div>
        <h1 className="text-2xl font-[600] text-white mb-8">
          <button className="group" onClick={() => setOpen(!open)}>
            {!open ? (
                <div>
                <CircleArrowRight color="#8E51FF" />
              </div>
            ) : (
                <div className="flex gap-5">
                    Finance Manager
                <CircleArrowLeft color="#8E51FF" />
              </div>
            )}
          </button>
        </h1>
        {open && (
          <div className="flex flex-col gap-3">
            <Link to={"/"}>
              <p className="text-white text-[14px]">Dashboard</p>
            </Link>
            <Link to={"/expences"}>
              <p className="text-white text-[14px]">Expences</p>
            </Link>
            <Link to={"/budget"}>
              <p className="text-white text-[14px]">Budget</p>
            </Link>
            <Link to={"/request-money"}>
              <p className="text-white text-[14px]">Request Money</p>
            </Link>
            <Link to={"/send-money"}>
              <p className="text-white text-[14px]">Send Money</p>
            </Link>
          </div>
        )}
      </div>
      <LogoutBtn open = {open}/>
    </div>
  );
};

export default SideBar;
