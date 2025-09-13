import React, { useEffect } from "react";
import useTransectionsStore from "../stores/useTransectionsStore";
import { Link, useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

const Transection = ({ transectionType }) => {
  const { transections, isGettingTransections, getTransections } =
    useTransectionsStore();
  const { accountId } = useParams();

  useEffect(() => {
    getTransections(accountId);
  }, []);

  return (
    <div className=" mt-20 px-5 h-[90vh]">
      <div className=" columns-3">
        {!isGettingTransections ? (
          transections.length !== 0 ? (
            transections
              .filter((transection) => {
                if (transection.transectionType === transectionType) {
                  return transection;
                }
              })
              .map((transection) => {
                return (
                  <div className="bg-[#00001d] p-5 rounded-2xl mb-5 flex-5 ">
                    <Link className="  flex justify-between  text-white ">
                      <p>{transection.category[0].categoryName}</p>
                      <p>₹ {transection.amount}/-</p>
                      <p>₹ {transection.transectionType}/-</p>
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

export default Transection;
