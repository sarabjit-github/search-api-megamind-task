import React, { useEffect, useState } from "react";
import styles from "../styles/filter.module.css";
import filterIcon from "../images/filter.svg";

export const Filter = ({ setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  let fetchData = async () => {
    setIsLoading(true);
    let url = "https://api.publicapis.org/categories";
    let res = await fetch(url);
    const data = await res.json();
    setIsLoading(false);
    const allCategories = data?.categories.map((category, index) => {
      return { id: index, category, checked: false };
    });
    setCategories(allCategories);
  };

  const toggleCheck = (categoryObj) => {
    let mapped = categories.map((category) => {
      return categoryObj.id === category.id
        ? { ...category, checked: !categoryObj.checked }
        : { ...category };
    });
    setCategories(mapped);
    // console.log(mapped);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filterSelectedCategories = categories.filter((categoryObj) => {
      return categoryObj.checked === true;
    });
    setSelectedCategories(filterSelectedCategories);
  }, [categories, setSelectedCategories]);

  return (
    <>
      <div>
        <div className={styles.filterHeading}>
          <div onClick={()=>setShowFilters(true)}>
            <span>Filter</span>
            <img
              src="https://img.icons8.com/ios-glyphs/30/null/sorting-options.png"
              alt="filter"
            />
          </div>
        </div>
        <aside className={styles.filterSection} style={{left: showFilters ? "0":""}}>
          
          <div className={styles.sideFilterHeading}>
          <h3>Filter by Categories</h3>
          <div className={styles.closeIcon} onClick={()=>setShowFilters(false)}>
            <img
              src="https://img.icons8.com/sf-regular/48/null/multiply.png"
              alt="close"
            />
          </div>
          </div>
          <h3>Filter by Categories</h3>
          <div className={styles.categoriesContainer}>
            {isLoading ? (
              <h3 style={{ marginTop: "1rem" }}>Loading...</h3>
            ) : (
              categories?.map((categoryObj, index) => {
                return (
                  <div key={index} className="category">
                    <input
                      type="checkbox"
                      defaultChecked={
                        categoryObj.checked === true ? true : false
                      }
                      id={categoryObj.category}
                      onClick={() => toggleCheck(categoryObj)}
                    />
                    <span>{categoryObj.category}</span>
                  </div>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </>
  );
};
