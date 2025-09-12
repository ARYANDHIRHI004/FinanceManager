import { create } from "zustand";

const useActionStore = create((set) => ({
  accountId: null,

  setAccountId: (accountId) => {
    set({ accountId: accountId });
  },
}));

export default useActionStore
