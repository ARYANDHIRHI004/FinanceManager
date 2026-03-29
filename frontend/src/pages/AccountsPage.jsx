import React, { useEffect } from "react";
import useAccountStore from "../stores/useAccountStore";
import { Link } from "react-router-dom";

const AccountsPage = () => {
  const {
    myAccounts,
    joinAccounts,
    getMyAccounts,
    getJoinAccounts,
  } = useAccountStore();

  useEffect(() => {
    getMyAccounts();
    getJoinAccounts();
  }, []);

  return (
    <div className="min-h-screen bg-[#080b14] text-white px-6 py-24">
      
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* My Accounts */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            My Accounts
          </h2>

          {myAccounts?.length > 0 ? (
            <div className="flex flex-col gap-3">
              {myAccounts.map((account) => (
                <Link
                  key={account._id}
                  to={`/accounts/${account._id}/${account.accountType}`}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition"
                >
                  {account.accountName}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No accounts</p>
          )}
        </div>

        {/* Joint Accounts */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Joint Accounts
          </h2>

          {joinAccounts?.length > 0 ? (
            <div className="flex flex-col gap-3">
              {joinAccounts.flatMap((group) =>
                group.accounts.map((account) => (
                  <Link
                    key={account._id}
                    to={`/accounts/${account._id}/${account.accountType}`}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center hover:bg-white/10 transition"
                  >
                    <span>{account.accountName}</span>
                    <span className="text-xs text-gray-400">
                      {account.accountType}
                    </span>
                  </Link>
                ))
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No joint accounts</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AccountsPage;