import React from "react";
import { X } from "lucide-react";

const TransectionModalForm = ({ status, onClose, type }) => {
  if (!status) return null;

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      {/* Modal Card */}
      <div className="bg-[#0f1320] border border-white/10 rounded-2xl w-[90%] max-w-md p-6 relative shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-white mb-4 capitalize">
          Add {type}
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          
          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Note */}
          <textarea
            placeholder="Note (optional)"
            rows={3}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm font-medium transition"
          >
            Save {type}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransectionModalForm;