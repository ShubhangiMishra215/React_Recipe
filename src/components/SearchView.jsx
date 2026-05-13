import React, { useEffect, useState } from "react";
import { ChevronLeft, Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const SearchView = () => {
  const { type, query } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMeals = async () => {
      setLoading(true);
      setMeals([]);
      try {
        const endpoint =
          type === "area"
            ? `filter.php?a=${query}`
            : type === "category"
            ? `filter.php?c=${query}`
            : `search.php?s=${query}`;

        const res = await fetch(`${API_URL}${endpoint}`);
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [type, query]); // refetches whenever type or query changes in URL

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to={"/"}
        className="text-yellow-400 hover:text-yellow-300 flex items-center mb-6 font-medium transition text-lg group"
      >
        <ChevronLeft className="w-6 h-6 mr-1 transition" />
        Back to Dashboard
      </Link>

      {loading && (
        <div className="text-center p-8 text-gray-300">
          <Loader className="animate-spin inline-block mr-2 text-blue-400" />
          Searching the databases...
        </div>
      )}

      {!loading && meals.length === 0 && (
        <div className="text-center p-8 text-gray-400">
          No results found. Try a different search.
        </div>
      )}

      {!loading && meals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </main>
  );
};

export default SearchView;