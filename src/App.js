import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Search } from "./components/Search";
import "./App.css";
import utilStyles from "./styles/utils.module.css";
import { SearchPage } from "./components/SearchPage";
import { Homepage } from "./components/Homepage";
import { Filter } from "./components/Filter";

function App() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    let url = "https://api.publicapis.org/entries";
    const fetchData = async () => {
      setIsLoading(true);
      let res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setApiData(data.entries);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <Link to="/">
          <div className="logo">
            <h1 className={utilStyles.headingXl}>
              Search<span>API</span>
            </h1>
          </div>
        </Link>
        <Search />
      </header>
      <main>
        <Filter setSelectedCategories={setSelectedCategories} />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                apiData={apiData}
                isLoading={isLoading}
                selectedCategories={selectedCategories}
              />
            }
          />
          <Route
            path="/search/:searchValue"
            element={
              <SearchPage
                apiData={apiData}
                isLoading={isLoading}
                selectedCategories={selectedCategories}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
export const Loader = () => {
  return (
    <>
      <h1
        className={utilStyles.headingXl}
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        Loading...
      </h1>
    </>
  );
};

export default App;
