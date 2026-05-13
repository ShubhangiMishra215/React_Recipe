import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import RecipeDetailView from "./components/RecipeDetailView";
import SearchView from "./components/SearchView";
import CuisineBar from "./components/Cuisine";
import HomeView from "./components/HomeView";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = useCallback(async (query) => {
    setSearchResult([]);
    setSearchLoading(true);
    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchResult([]);
    setSearchLoading(true);
    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const filterByCategory = useCallback((category) => {
    filterRecipe(category, "c");
  }, [filterRecipe]);

  const filterByArea = useCallback((area) => {
    filterRecipe(area, "a");
  }, [filterRecipe]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
        <NavBar handleSearch={handleSearch} />
        <CuisineBar filterByArea={filterByArea} />
        <Routes>
          <Route path="/" element={<HomeView filterByCategory={filterByCategory} />} />
          <Route path="/recipe/:id" element={<RecipeDetailView />} />
          <Route path="/search/:type/:query"
            element={<SearchView meals={searchResult} loading={searchLoading} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;