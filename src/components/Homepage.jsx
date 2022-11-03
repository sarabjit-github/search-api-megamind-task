import React, { useState, useEffect } from "react";
import { ApiCard } from "./ApiCard";
import { Loader } from "../App";

export const Homepage = ({ isLoading, apiData, selectedCategories }) => {
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const handleSelectedData = () => {
      // data: which is searched in search bar

      if (selectedCategories.length !== 0) {
        let filterData = [];
        for (let i = 0; i < selectedCategories.length; i++) {
          let filterDataLoop = apiData.filter(
            ({ API, Description, HTTPS, Link, Category }) => {
              return selectedCategories[i].category === Category;
            }
          );
          filterData.push(...filterDataLoop);
        }
        console.log(filterData);
        //   setData(filterData);
        setSelectedData(filterData);
      }
    };
    handleSelectedData();
  }, [apiData, selectedCategories]);

  return (
    <div className="apiContainer">
      {isLoading ? (
        <Loader />
      ) : selectedCategories.length === 0 ? (
        apiData?.map(({ API, Description, HTTPS, Link }, index) => {
          return (
            <ApiCard
              key={index}
              name={API}
              desc={Description}
              https={HTTPS}
              link={Link}
            />
          );
        })
      ) : (
        selectedData.map(({ API, Description, HTTPS, Link }, index) => {
          return (
            <ApiCard
              key={index}
              name={API}
              desc={Description}
              https={HTTPS}
              link={Link}
            />
          );
        })
      )}
    </div>
  );
};
