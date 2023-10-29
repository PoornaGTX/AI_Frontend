import React from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const EducationPageBtnContainer = () => {
  const { pdfsNumOfPagesEDU, pageAdminEDU, changePageEDU } = useAppContext();

  const pages = Array.from({ length: pdfsNumOfPagesEDU }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = pageAdminEDU + 1;
    if (newPage > pdfsNumOfPagesEDU) {
      newPage = 1;
    }
    changePageEDU(newPage);
  };

  const prevPage = () => {
    let newPage = pageAdminEDU - 1;
    if (newPage < 1) {
      newPage = pdfsNumOfPagesEDU;
    }
    changePageEDU(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((page) => {
          return (
            <button
              type="button"
              className={page === pageAdminEDU ? "pageBtn active" : "pageBtn"}
              key={page}
              onClick={() => changePageEDU(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={nextPage}>
        next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default EducationPageBtnContainer;
