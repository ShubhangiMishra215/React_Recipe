import React from "react";
import useFetch from "./useFetch";
import Slider from "react-slick";
import { Clock, Loader } from "lucide-react";
import { Link } from 'react-router-dom';

const TrendingSlider = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);

  const meals = data?.meals || [];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  if (loading) {
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader className="animate-spin inline-block mr-2 text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-5">Failed to load meals</div>
    );
  }

  return (
    <section className="mt-6 w-full">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-gray-100 mb-6 pl-4 flex items-center">
        <Clock className="w-6 h-6 mr-3 text-blue-500" />
        {title}
      </h2>

      {/* Slider */}
      <div className="w-full px-4">
        <Slider {...settings}>
          {meals.map((meal) => (
            <div key={meal.idMeal} className="px-2">
              <Link to={`/recipe/${meal.idMeal}`}>
                <div className="w-[140px] h-[140px] bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg cursor-pointer group transition duration-500 hover:border-blue-500 hover:scale-105 mx-auto flex items-center justify-center">
                  <div className="w-[120px] h-[120px] overflow-hidden rounded-xl">
                    <img
                      src={meal?.strMealThumb}
                      alt={meal?.strMeal}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TrendingSlider;
