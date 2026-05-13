import React from 'react'
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategorySelection = ({ filterByCategory }) => {
  const featuredCategories = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Breakfast",
    "Goat",
  ];

  return (
    <section className="mt-6 w-full">
      <h2 className="text-3xl font-extrabold text-gray-100 mb-6 pl-4 flex items-center">
        <Utensils className="w-6 h-6 mr-3 text-blue-500" />
        Quick Filter by Category
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6'>
        {featuredCategories.map((cat, index) =>
          <Link
            to={`/search/category/${cat}`}
            key={index}
            onClick={() => filterByCategory(cat)}
            className='bg-gray-800 p-4 sm:p-5 rounded-xl shadow-xl shadow-black transition duration-300
            text-center font-semibold text-gray-100 border border-gray-700 hover:border-blue-500
            hover:text-blue-700 transform hover:scale-[1.05] hover:bg-gray-700/50 mx-5'
          >
            {cat}
          </Link>
        )}
      </div>
    </section>
  )
}

export default CategorySelection