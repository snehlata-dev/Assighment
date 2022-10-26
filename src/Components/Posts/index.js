import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import searchImg from "../../assets/Icon/search.svg";
import { sortOption } from "./Option";
import Pagination from "./Pagination";
import PostGrid from "./PostGrid";
import "./posts.css";
import PostTable from "./PostTable";
const Posts = () => {
  const postList = useSelector((state) => state.PostListReducer.postList);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [paginationStatus, setPaginationStatus] = useState({
    loading: false,
    firstIndex: 0,
    lastIndex: 0,
    totalCount: 0,
  });
/**
   * This function will check if sort and search value available in localStorage
   */
  useEffect(() => {
    const searchValue = localStorage.getItem("searchValue");
    const sortValue = localStorage.getItem("sortValue");
    if (searchValue) {
      setSearchValue(searchValue);
    }
    if (sortValue) {
      setSortValue(JSON.parse(sortValue));
    }
  }, []);

  /**
   * This function will handle search value and store the value  in localstorage
   * @param {object} e 
   */
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    localStorage.setItem("searchValue", e.target.value);
  };

  /**
   * This function will handle sorting value and store the value  in localstorage
   * @param {object} value
   */
  const handleSortValue = (value) => {
    setSortValue(value);
    localStorage.setItem("sortValue", JSON.stringify(value));
  };


  /**
   * This function is responsible for showing count of selected post from total post
   * @param {number} firstIndex 
   * @param {number} lastIndex 
   * @param {number} totalCount 
   */

   /**
   * This function will update call when page will change and get data from child component
   */
  const onPageChange = (firstIndex, lastIndex, totalCount) => {
    const getLastIndex = lastIndex > totalCount ? totalCount : lastIndex;
    setPaginationStatus({
      ...paginationStatus,
      firstIndex: firstIndex,
      lastIndex: getLastIndex,
      totalCount: totalCount,
      loading: true,
    });
  };

  /**
   * This Function will fired when we click on search Icon of input
   */
  const handleSearch = () => {
    let str  =  searchValue.replace(/^"(.*)"$/, '$1');
    setSearchString(str);
  };

  return (
    <div className="App">
      <div className="filter-container">
        <div className="search-input">
          <input
            type="search"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchValue}
          />
          <span onClick={handleSearch}>
            <img src={searchImg} width={2} height={2} />
          </span>
        </div>

        <Select
          options={sortOption}
          placeholder="Sort By"
          isClearable
          value={sortValue}
          onChange={handleSortValue}
          className="select-sort"
        />
      </div>


      {postList.length ? (
        <div className="pagination-status">
          {paginationStatus.loading && (
            <span>{`Showing ${paginationStatus.firstIndex}-${paginationStatus.lastIndex} Outof ${paginationStatus.totalCount}`}</span>
          )}
        </div>
      ) : (
        ""
      )}
      <PostGrid searchValue={searchString} sortValue={sortValue} />
      <PostTable />
      
      <div className="pagination-container">
        {postList.length > 0 && <Pagination onPageChange={onPageChange} />}
      </div>
    </div>
  );
};
export default Posts;
