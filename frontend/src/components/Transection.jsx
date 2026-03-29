import React, { useEffect, useState } from "react";
import useTransectionsStore from "../stores/useTransectionsStore";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import TransectionModalForm from "./TransectionModalForm";

const Transection = ({ transectionType }) => {
  const { transections, isGettingTransections, getTransections } =
    useTransectionsStore();

  const { accountId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getTransections(accountId);
  }, [accountId]);

  const filtered = transections?.filter(
    (t) => t.transectionType === transectionType,
  );

  return (
    <div className="min-h-screen bg-[#080b14] text-white px-6 py-24">
      {/* Modal */}
      {modalOpen && <TransectionModalForm status={modalOpen} />}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold capitalize text-gray-200">
          {transectionType}
        </h2>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Add {transectionType}
        </button>
      </div>

      {/* Content */}
      {isGettingTransections ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="animate-spin text-gray-400" />
        </div>
      ) : filtered?.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div
              key={t._id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium">
                  {t.category?.[0]?.categoryName || "No Category"}
                </p>
                <span className="text-xs text-gray-400 capitalize">
                  {t.transectionType}
                </span>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-400 mb-3">
                {t.note || "No note"}
              </p>

              {/* Amount */}
              <p className="text-lg font-semibold">₹ {t.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No {transectionType} found</p>
      )}
    </div>
  );
};

export default Transection;
