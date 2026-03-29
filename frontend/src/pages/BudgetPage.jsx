import React, { useEffect } from "react";
import useCategoryStore from "../stores/useCategoryStore.js";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const BudgetPage = () => {
  const { categories, isGettingCategories, getCategory } =
    useCategoryStore();

  const { accountId } = useParams();

  useEffect(() => {
    getCategory(accountId);
  }, [accountId]);

  return (
    <div className="min-h-screen bg-[#080b14] text-white px-6 py-24">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-200">
          Budget Overview
        </h1>
        <p className="text-sm text-gray-500">
          Manage your category-wise budgets
        </p>
      </div>

      {/* Content */}
      {isGettingCategories ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="animate-spin text-gray-400" />
        </div>
      ) : categories?.length > 0 ? (
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
            >
              {/* Top */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium text-gray-200">
                  {category.categoryName}
                </p>
                <span className="text-xs text-gray-400">
                  Budget
                </span>
              </div>

              {/* Amount */}
              <div className="text-lg font-semibold text-white">
                ₹ {category.budget}
              </div>

              {/* Progress (optional visual touch) */}
              <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[60%]" />
              </div>
            </div>
          ))}
        </div>

      ) : (
        <p className="text-gray-500 text-sm">
          No categories found
        </p>
      )}
    </div>
  );
};

export default BudgetPage;