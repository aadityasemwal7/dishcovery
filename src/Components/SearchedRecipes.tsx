import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import HeartIcon from "../../assets/heart.png"; // Assuming you have a heart icon SVG

const SearchedRecipes = () => {
  

  const location = useLocation()
  const recipes = location.state?.recipes || []

  useEffect(() => {
    console.log(recipes)
  }, [recipes])

  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="No results"
          className="w-24 h-24 opacity-60 mb-4"
        />
        <p className="text-xl text-gray-500 font-semibold">No recipes found. Try another search!</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center tracking-wide">
        Search Results
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group relative"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          <div className="flex absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow items-center">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img src={HeartIcon} width={40} alt="likes" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xs py-1 px-2">
              {recipe.aggregateLikes}
            </span>
            </div>
          </div>
            <div className="p-5 flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center group-hover:text-green-600 transition-colors duration-300">
                {recipe.title}
              </h3>
              <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow transition">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchedRecipes;