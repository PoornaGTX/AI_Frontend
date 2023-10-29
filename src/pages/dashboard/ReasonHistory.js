import React, { useEffect } from "react";
import ReasonSearchContainer from "../../components/ReasonSearchContainer";
import ReasonHistoryContainer from "../../components/ReasonHistoryContainer";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

const ReasonHistory = () => {
  const navigator = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (user.type !== "Admin") {
      navigator("/");
    }
  });

  return (
    <>
      <ReasonSearchContainer />
      <ReasonHistoryContainer />
    </>
  );
};

export default ReasonHistory;
