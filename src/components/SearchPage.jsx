import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../App";
import { ApiCard } from "./ApiCard";

export const SearchPage = ({ apiData, isLoading, selectedCategories }) => {
  const { searchValue } = useParams();
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const handleFilterData = () => {
      let filterData = apiData.filter((api) => {
        return api.API.toLowerCase().includes(searchValue);
      });
      setData(filterData);
      // console.log(filterData);
    };
    handleFilterData();
  }, [searchValue, apiData]);

  useEffect(() => {
    const handleSelectedData = () => {
      // data: which is searched in search bar

      if (selectedCategories.length !== 0) {
        let filterData = [];
        for (let i = 0; i < selectedCategories.length; i++) {
          let filterDataLoop = data.filter(
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
  }, [data, selectedCategories]);

  return (
    <>
      <div className="cr">
        <h2 style={{ marginBottom: "2rem" }}>You search for `{searchValue}`</h2>
        <div className="apiContainer">
          {!isLoading ? (
            selectedCategories.length === 0 ? (
              data?.map(({ API, Description, HTTPS, Link }, index) => {
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
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
