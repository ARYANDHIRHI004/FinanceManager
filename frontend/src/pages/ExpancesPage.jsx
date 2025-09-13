import React, { useEffect } from "react";
import useTransectionsStore from "../stores/useTransectionsStore";
import { Link, useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import Transection from "../components/Transection";

const ExpancesPage = () => {
  return (
    <div>
      <Transection transectionType={"Out"} />
    </div>
  );
};

export default ExpancesPage;
