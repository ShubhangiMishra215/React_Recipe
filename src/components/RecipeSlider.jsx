import React from "react";
import useFetch from "./useFetch";
import RecipeCard from "./RecipeCard";
import Slider from "react-slick";
import { Clock, Loader } from "lucide-react";

const RecipeSlider = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);
  const meals = data?.meals || [];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  if (loading) return (
    <div className="text-center p-8 text-gray-300">
      <Loader className="animate-spin inline-block mr-2 text-blue-400" />
    </div>
  );

  if (error) return (
    <div className="text-center p-8 text-red-400">
      Failed to load. Try again later.
    </div>
  );

  if (meals.length === 0) return null;

  return (
    <section className="mt-2 w-full overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-100 mb-6
        border-l-4 border-yellow-400 pl-4 flex items-center">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-500" />
        {title}
      </h2>

      <div className="w-[90%] mx-auto px-2 sm:px-4">
        <Slider {...settings}>
          {meals.map((meal) => (
            <div key={meal.idMeal} className="px-2 sm:px-3">
              <RecipeCard meal={meal} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default RecipeSlider;