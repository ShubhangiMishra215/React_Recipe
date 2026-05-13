import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookOpen, ChevronLeft, Loader, Utensils } from 'lucide-react';
import useFetch from './useFetch';
import { API_URL } from './useFetch';

const RecipeDetailView = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${API_URL}lookup.php?i=${id}`);
  const meal = data?.meals?.[0];

  if (loading) return (
    <div className="text-center p-8 text-gray-300">
      <Loader className="animate-spin inline-block mr-2 text-blue-400" />
      Preparing your recipe card
    </div>
  );

  if (error) return (
    <div className="text-center p-8 text-red-400">
      Something went wrong: {error}
    </div>
  );

  if (!meal) return (
    <div className="text-center p-8 text-gray-400">
      Recipe not found.
    </div>
  );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  const instructions = meal.strInstructions
  ? meal.strInstructions
      .split(/\r\n\r\n|\n\n|\r\n|\n/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0)
      .filter((step) => !/^step\s*\d+[:\.]?$/i.test(step))
  : [];
   
  return (
    <>
      <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Link
          to={'/'}
          className='text-yellow-400 hover:text-yellow-300 flex items-center mb-6 font-medium transition text-lg group'
        >
          <ChevronLeft className='w-6 h-6 mr-1 transition' />
          Back to Dashboard
        </Link>

        <div className='bg-gray-900 p-6 md:p-12 rounded-3xl shadow-2xl shadow-black/70 border border-gray-800'>
          <div className='flex flex-col lg:flex-row lg:space-x-12'>

            {/* LEFT: title above image */}
            <div className='flex flex-col items-start lg:w-1/2'>
              <h1 className='text-4xl font-black text-gray-100 mb-6 leading-tight'>
                {meal.strMeal}
              </h1>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className='w-full max-w-[400px] h-[400px] rounded-xl shadow-black/50 object-cover border-4 border-gray-800 ring-2 ring-blue-500/50'
              />
            </div>

            {/* RIGHT: ingredients */}
            <div className='lg:w-1/2 bg-gray-800 rounded-xl shadow-inner shadow-black/30 border border-gray-700 p-6 mt-8 lg:mt-0'>
              <h2 className='text-2xl font-bold text-yellow-400 mb-6 flex items-center border-b border-gray-700 pb-3'>
                <Utensils className='mr-2 w-6 h-6' />
                Key Ingredients
              </h2>

              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 list-none p-0'>
                {ingredients.map((item, index) => (
                  <li key={index} className='flex items-start text-gray-300 text-base ml-2'>
                    <span className='text-blue-400 font-extrabold text-lg mr-2 shrink-0'>•</span>
                    <span>
                      {item.measure && (
                        <span className='text-gray-400 mr-1'>{item.measure}</span>
                      )}
                      {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>

              <div className='mt-8 pt-4 border-t border-gray-700'>
                <div className='flex flex-wrap gap-y-2 gap-x-3'>
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md">
                    {meal.strCategory}
                  </span>
                  <span className="bg-green-600 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md">
                    {meal.strArea}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Instructions — outside the card, below it */}
        <div className='mt-14 pt-8 border-t border-gray-800'>
          <h2 className='text-3xl font-bold text-gray-100 mb-8 flex items-center'>
            <BookOpen className='w-7 h-7 mr-3 text-blue-500' />
            Detailed Preparation Steps
          </h2>
          <ol className='space-y-6 list-none p-0'>
            {instructions.map((step, index) => (
              <li key={index} className='text-lg leading-relaxed bg-gray-800 p-5 rounded-xl border-l-4 border-blue-500 shadow-lg shadow-black transition duration-300 hover:bg-gray-700/50 text-gray-300'>
                <span className='font-extrabold text-yellow-400 mr-3 text-xl'>
                  {index + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

      </main>
    </>
  );
};

export default RecipeDetailView;