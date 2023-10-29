import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import ReasonHistoryPage from "./ReasonHistoryPage";
import Wrapper from "../assets/wrappers/JobsContainer";
import ReasonPageBtnContainer from "./ReasonPageBtnContainer";

const ReasonHistoryContainer = () => {
  const {
    isLoading,
    searchMR,
    sortMR,
    searchTypeMR,
    pdfsNumOfPages,
    pageAdmin,
    getPDFHistory,
    allPDF,
    pdfCount,
  } = useAppContext();

  useEffect(() => {
    getPDFHistory();
  }, [pageAdmin, searchMR, sortMR, searchTypeMR]);

  if (isLoading) {
    return <Loading center />;
  }

  if (allPDF.length === 0) {
    return (
      <Wrapper>
        <h2>No PDFs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {pdfCount} PDF{allPDF.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {allPDF.map((pdf) => {
          return <ReasonHistoryPage key={pdf._id} {...pdf} />;
        })}
      </div>
      {pdfsNumOfPages > 1 && <ReasonPageBtnContainer />}
    </Wrapper>
  );
};

export default ReasonHistoryContainer;
