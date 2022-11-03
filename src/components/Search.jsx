import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/search.module.css";

export const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSearch = (e)=>{
    if(e.keyCode === 13){
        if(value){
          navigate(`/search/${value}`);
        }
    }
  }
  return (
    <>
      <div className={styles.searchWrapper}>
        {/* <div className="search"> */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for APIs"
        />
        <div className={styles.searchIcon}>
          <svg className={styles.svgIcon} viewBox="0 0 25 25">
            <path d="M20.07 18.93l-4.16-4.15a6 6 0 1 0-.88.88l4.15 4.16a.62.62 0 1 0 .89-.89zM6.5 11a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0z"></path>
          </svg>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};
