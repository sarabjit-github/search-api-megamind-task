import React, { useEffect, useState } from "react";
import styles from "../styles/filter.module.css";

export const Filter = ({ setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    <aside className={styles.filterSection}>
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
                  defaultChecked={categoryObj.checked === true ? true : false}
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
  );
};
