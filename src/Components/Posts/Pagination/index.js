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

  const [perPageCount, setPerPageCount] = useState(25);

  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    const totalPages = Math.ceil(postList.length / perPageCount);
    setTotalPages(totalPages);
    onChangePage(0);
  }, [perPageCount]);

  const onChangePage = (number) => {
    console.log("number", number);
    setCurrentPage(number);
    const startIndex = number * perPageCount;
    const lastIndex = startIndex + perPageCount;
    console.log("startIndex", startIndex);
    console.log("endIndex", lastIndex);
    let copyPostList = postData.slice(startIndex, lastIndex);
    dispatch(PostListAction(copyPostList));
    onPageChange(startIndex, lastIndex, postData.length);
  };

  const perpageOptions = [
    { value: "3", label: "3" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const onChangeRecords = (perPageCount) => {
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
