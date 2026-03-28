import React, { useEffect, useState } from "react";
import useTransectionsStore from "../stores/useTransectionsStore";
import { Link, useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import TransectionModalForm from "./TransectionModalForm";

const Transection = ({ transectionType }) => {
  const { transections, isGettingTransections, getTransections } = useTransectionsStore();
  const { accountId } = useParams();

  useEffect(() => {
    getTransections(accountId);
  }, []);

  const [modalStatus, setModalStatus] = useState(false)

  return (
    <div className=" mt-20 px-5 h-[90vh]">
      <div className="absolute">
        <TransectionModalForm status={modalStatus} />

      </div>
      <div className="columns-1">
        <div>
          <button
          onClick={()=>setModalStatus(!modalStatus)} 
          className="bg-[#00001d] text-white px-3 py-3 rounded-2xl hover:cursor-pointer">Add Expance</button>
        </div>
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
                  <div className="bg-[#00001d] p-5 rounded-2xl mt-5 flex-5 ">
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
