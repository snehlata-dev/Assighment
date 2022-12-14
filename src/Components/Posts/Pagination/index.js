import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { PostListAction } from "../../../Redux/Actions/PostActions";
import { postData } from "../../PostData";
import CustomePagination from "./CustomePagination";
const Pagination = ({ onPageChange }) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.PostListReducer.postList);

  const [currentPage, setCurrentPage] = useState(0);

  const [perPageCount, setPerPageCount] = useState(10);

  const [totalPages, setTotalPages] = useState(2);

 /**
   * this function will run everytime when perPageCount will change and return  totalPage
   */
  useEffect(() => {
    const totalPages = Math.ceil(postList.length / perPageCount);
    setTotalPages(totalPages);
    onChangePage(0);
  }, [perPageCount]);

 console.log("totalPages",totalPages)
   /**
   * this function will calculate startIndex and lastIndex everytime when perpageCount change
   */
  const onChangePage = (number) => {
    setCurrentPage(number);
    const startIndex = number * perPageCount;
    const lastIndex = startIndex + perPageCount;
    let copyPostList = postData.slice(startIndex, lastIndex);
    dispatch(PostListAction(copyPostList));
    /**
   * this function will pass startIndex, lastIndex, postData.length to the parent component(child to parent data passing)
   */
    onPageChange(startIndex, lastIndex, postData.length);
  };
  const perpageOptions = [
    { value: "3", label: "3" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

 /**
   * using this function we will select value based on that records will show to use(i.e if we will select 10  per page 10 will show)
   */
  const onChangeRecords = (perPageCount) => {
    console.log(perPageCount,"perPageCount")
    dispatch(PostListAction(postData));
    setPerPageCount(parseInt(perPageCount.value));
  };
  return (
    <>
      {" "}
      <Select
        name="status"
        className="float-right select-style perpage"
        classNamePrefix="select"
        options={perpageOptions}
        value={{
          value: perPageCount,
          label: perPageCount,
        }}
        placeholder={"Records Per Page"}
        onChange={(e) => onChangeRecords(e)}
      />{" "}
      <CustomePagination
        totalPages={totalPages}
        onChangePage={onChangePage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Pagination;
