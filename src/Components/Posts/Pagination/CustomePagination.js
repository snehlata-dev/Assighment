import React, { useEffect, useState } from "react";
import "./Pagination.css";
const CustomePagination = (props) => {

  const { totalPages, onChangePage, currentPage } = props;

  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    getUpdatedPages();
  }, [currentPage, totalPages]);

    /**
   * This function create Array of visible pages of pagination
   */
     const getUpdatedPages = () => {
      let startPage = 0;
      let endPage = 0;
      if (totalPages <= 5) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
        console.log("1");

      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 3) {
          startPage = 1;
          endPage = 5;
          console.log("4");
        } else if (currentPage + 2 >= totalPages) {
          console.log("2");
          startPage = totalPages - 5;
          endPage = totalPages;
        } else {
          console.log("3");
           startPage = currentPage - 2;
           endPage = currentPage + 2;
        }
      }
  
      // create an array of pages to ng-repeat in the pager control
      let pages = [...Array(endPage + 1 - startPage).keys()].map(
        (i) => startPage + i
      );
      console.log("pages",pages)
      setVisiblePages(pages);
    };

  const onClickHandle = (page) => {
    onChangePage(page);
  };

  return (
    <>
      {totalPages > 1 ? (
        <div>
          <ul className="pagination">
            <li
              className={currentPage === 0 ? "page-item disabled" : "page-item"}
              onClick={() => onClickHandle(currentPage - 1)}
            >
              <a className="page-link">Previous</a>
            </li>

            {visiblePages.map((page, index) => (
              <li
                key={index}
                className={
                  currentPage === page - 1 ? "page-item active" : "page-item"
                }
                onClick={() => onClickHandle(page - 1)}
              >
                <a className="page-link">{page}</a>
              </li>
            ))}
            
            <li
              className={
                currentPage === totalPages - 1
                  ? "page-item disabled"
                  : "page-item"
              }
              onClick={() => onClickHandle(currentPage + 1)}
            >
              <a className="page-link">Next</a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default CustomePagination;
