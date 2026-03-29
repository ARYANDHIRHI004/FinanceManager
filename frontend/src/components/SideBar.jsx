import React, { useState } from "react";
import LogoutBtn from "./logoutBtn";
import { Link, useParams } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const { accountId, accountType } = useParams();

  const navLinks = [
    { name: "Dashboard", path: "" },
    { name: "Expenses", path: "expences" },
    { name: "Income", path: "Income" },
    { name: "Budget", path: "budget" },
    { name: "Request Money", path: "request-money" },
    { name: "Send Money", path: "send-money" },
  ];

  return (
    <div
      className={`${
        open ? "w-64" : "w-16"
      } bg-[#080b14] border-r border-white/10 h-screen flex flex-col justify-between px-3 py-6 transition-all duration-300`}
    >
      {/* Top */}
      <div>
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full mb-8 text-white"
        >
          {open ? (
            <>
              <span className="text-lg font-semibold tracking-tight">
                Finance
              </span>
              <CircleArrowLeft size={20} />
            </>
          ) : (
            <CircleArrowRight size={20} className="mx-auto" />
          )}
        </button>

        {/* Links */}
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={`/accounts/${accountId}/${accountType}/${link.path}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              {open && <span>{link.name}</span>}
            </Link>
          ))}

          {/* Joint only */}
          {accountType === "Joint" && (
            <Link
              to={`/accounts/${accountId}/${accountType}/projects`}
              className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              {open && <span>Projects</span>}
            </Link>
          )}

          {/* Back to accounts */}
          <Link
            to="/accounts"
            className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            {open && <span>All Accounts</span>}
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <LogoutBtn open={open} />
    </div>
  );
};

export default SideBar;