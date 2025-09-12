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
    <div className=" mt-20 px-5 h-[90vh]">
      <div className=" columns-3">
        {!isGettingCategories ? (
          categories.length !== 0 ? (
            categories?.map((category) => {
              return (
                <div className="bg-[#00001d] p-5 rounded-2xl mb-5 flex-5 ">
                  <Link className="  flex justify-between  text-white ">
                    <p>{category.categoryName}</p>
                    <p>₹ {category.budget}/-</p>
                  </Link>
                </div>
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
