import React from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const ReasonPageBtnContainer = () => {
  const { pdfsNumOfPages, pageAdmin, changePage } = useAppContext();

  const pages = Array.from({ length: pdfsNumOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = pageAdmin + 1;
    if (newPage > pdfsNumOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  const prevPage = () => {
    let newPage = pageAdmin - 1;
    if (newPage < 1) {
      newPage = pdfsNumOfPages;
    }
    changePage(newPage);
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
              className={page === pageAdmin ? "pageBtn active" : "pageBtn"}
              key={page}
              onClick={() => changePage(page)}
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

export default ReasonPageBtnContainer;
