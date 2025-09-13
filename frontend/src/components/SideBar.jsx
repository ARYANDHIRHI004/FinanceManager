import React, { useState } from "react";
import LogoutBtn from "./logoutBtn";
import { Link, useParams } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const {accountId} = useParams();

  return (
    <div
      className={` ${
        open ? "w-[17vw]" : "w-[4.5vw]"
      } bg-[#00001d] h-screen flex flex-col justify-between px-4 py-8 transition-width duration-500`}
    >
      <div>
        <h1 className="text-2xl font-[600] text-white mb-8">
          <button className="group" onClick={() => setOpen(!open)}>
            {!open ? (
                <div>
                <CircleArrowRight color="#ffffff" />
              </div>
            ) : (
                <div className="flex gap-5">
                    Finance Manager
                <CircleArrowLeft color="#ffffff" />
              </div>
            )}
          </button>
        </h1>
        {open && (
          <div className="flex flex-col gap-5">
            <Link to={`/accounts/${accountId}`}>
              <p className="text-white text-[14px]">Dashboard</p>
            </Link>
            <Link to={`/accounts/${accountId}/expences`}>
              <p className="text-white text-[14px]">Expences</p>
            </Link>
            <Link to={`/accounts/${accountId}/Income`}>
              <p className="text-white text-[14px]">Income</p>
            </Link>
            <Link to={`/accounts/${accountId}/budget`}>
              <p className="text-white text-[14px]">Budget</p>
            </Link>
            <Link to={`/accounts/${accountId}/request-money`}>
              <p className="text-white text-[14px]">Request Money</p>
            </Link>
            <Link to={`/accounts/${accountId}/send-money`}>
              <p className="text-white text-[14px]">Send Money</p>
            </Link>
            <Link to={"/accounts"}>
              <p className="text-white text-[14px]">Accounts</p>
            </Link>
          </div>
        )}
      </div>
      <LogoutBtn open = {open}/>
    </div>
  );
};

export default SideBar;
