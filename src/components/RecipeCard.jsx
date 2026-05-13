import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 cursor-pointer group transition duration-500 hover:border-blue-500 hover:scale-105">

        {/* Image */}
        <div className="h-60 p-4 overflow-hidden">
          <img
            src={meal?.strMealThumb}
            alt={meal?.strMeal}
            className="w-full h-full object-cover rounded-xl transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* Title */}
        <div className="p-3 text-center">
          <h2 className="text-white text-lg font-bold">
            {meal?.strMeal}
          </h2>
        </div>

      </div>
    </Link>
  );
};

export default RecipeCard;