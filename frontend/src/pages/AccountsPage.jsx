import React, { use, useEffect } from "react";
import useAccountStore from "../stores/useAccountStore";
import { Link } from "react-router-dom";
import useActionStore from "../stores/useActions";

const AccountsPage = () => {
  const { myAccounts, isGettingAccounts, getMyAccounts } = useAccountStore();
  const { setAccountId } = useActionStore();

  useEffect(() => {
    getMyAccounts();
  }, []);

  return (
    <div className="p-5">
      <div>
        {myAccounts &&
          myAccounts?.map((account) => {
              return <Link to={`/accounts/${account._id}`}>
              <div className="bg-[#00001d] p-5 rounded-2xl flex flex-col gap-5 text-white">
                {account.accountName}
              </div>
            </Link>
          })}
      </div>
    </div>
  );
};

export default AccountsPage;
