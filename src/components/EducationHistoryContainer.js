import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import EducationHistroyPage from "./EducationHistroyPage";
import Wrapper from "../assets/wrappers/JobsContainer";
import EducationPageBtnContainer from "./EducationPageBtnContainer";

const EducationHistoryContainer = () => {
  const {
    isLoading,
    searchEDU,
    sortEDU,
    searchTypeEDU,
    pdfsNumOfPagesEDU,
    pageAdminEDU,
    getPDFHistoryEDU,
    allPDFEDU,
    pdfCountEDU,
  } = useAppContext();

  useEffect(() => {
    getPDFHistoryEDU();
  }, [pageAdminEDU, searchEDU, sortEDU, searchTypeEDU]);

  if (isLoading) {
    return <Loading center />;
  }

  if (allPDFEDU.length === 0) {
    return (
      <Wrapper>
        <h2>No PDFs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {pdfCountEDU} PDF{allPDFEDU.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {allPDFEDU.map((pdf) => {
          return <EducationHistroyPage key={pdf._id} {...pdf} />;
        })}
      </div>
      {pdfsNumOfPagesEDU > 1 && <EducationPageBtnContainer />}
    </Wrapper>
  );
};

export default EducationHistoryContainer;
