import React, { useEffect } from "react";
import useCategoryStore from "../stores/useCategoryStore.js";
import { Link, useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

const BudgetPage = () => {
  const { categories, isGettingCategories, getCategory } = useCategoryStore();
  const { accountId } = useParams();

  useEffect(() => {
    getCategory(accountId);
  }, []);

  return (
    <div className=" mt-20 px-5">
      <div className=" flex flex-col gap-5">
        {!isGettingCategories ? (
          categories.length !== 0 ? (
            categories?.map((category) => {
              return (
                <Link className="bg-[#00001d] p-5 rounded-2xl flex justify-between text-white">
                  <p>{category.categoryName}</p>
                  <p>₹ {category.budget}/-</p>
                </Link>
              );
            })
          ) : (
            "No categories found"
          )
        ) : (
          <div className="flex justify-center h-[50vh] items-center">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;
