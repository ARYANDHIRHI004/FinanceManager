import React, { use, useEffect } from "react";
import useAccountStore from "../stores/useAccountStore";
import { Link } from "react-router-dom";
import useActionStore from "../stores/useActions";
import { CloudCog } from "lucide-react";

const AccountsPage = () => {
  const {
    myAccounts,
    isGettingAccounts,
    getMyAccounts,
    joinAccounts,
    getJoinAccounts,
  } = useAccountStore();


  useEffect(() => {
    getMyAccounts();
    getJoinAccounts();
  }, []);


  return (
    <div className="p-5 pt-30 flex gap-5 h-screen">
      <div className="flex-2">
        <h1>My Accounts</h1>
        {myAccounts.length !== 0 ? (
          myAccounts?.map((account) => {
            return (
              <Link key={account._id} to={`/accounts/${account._id}/${account.accountType}`}>
                <div className="bg-[#00001d] p-5 rounded-2xl mt-2 flex flex-col gap-5 text-white">
                  {account.accountName}
                </div>
              </Link>
            );
          })
        ) : (
          <h1>No accounts</h1>
        )}
      </div>
      <div className="flex-2">
        <h1>Joint Accounts</h1>
        {joinAccounts.lenght !== 0 ? (
          joinAccounts.map((accounts) =>
            accounts.accounts.map((account) => {
              return (
                <Link key={account._id} to={`/accounts/${account._id}/${account.accountType}`}>
                  <div className="bg-[#00001d] p-5 rounded-2xl mt-2  text-white flex justify-between">
                    <p>{account.accountName}</p>
                    <p>{account.accountType}</p>
                  </div>
                </Link>
              );
            }),
          )
        ) : (
          <h1>No Joint accounts</h1>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;
