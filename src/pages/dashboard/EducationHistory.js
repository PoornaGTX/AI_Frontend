import React, { useEffect } from "react";
import EducationSearchContainer from "../../components/EducationSearchContainer";
import EducationHistoryContainer from "../../components/EducationHistoryContainer";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";

const EducationHistory = () => {
  const navigator = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (user.type !== "Admin") {
      navigator("/");
    }
  });

  return (
    <>
      <EducationSearchContainer />
      <EducationHistoryContainer />
    </>
  );
};

export default EducationHistory;
