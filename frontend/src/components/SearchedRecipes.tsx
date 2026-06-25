import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeartIcon from "../../assets/heart.png";

const SearchedRecipes = () => {
  const location = useLocation();
  const recipes = location.state?.recipes || [];

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

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
    <div className="py-8 px-4 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <h2 className="text-3xl font-extrabold text-green-700 mb-10 text-center tracking-tight drop-shadow-lg">
        Search Results
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {recipes.map((recipe : any) => (
          <div
            key={recipe.id}
            className="relative group bg-white/80 backdrop-blur-lg border border-green-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
          >
            {/* Heart Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="relative w-10 h-10 flex items-center justify-center animate-bounce-slow">
                <img
                  src={HeartIcon}
                  className="w-full h-full rounded-full border-2 border-pink-200 shadow"
                  alt="likes"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm pointer-events-none">
                  {recipe.aggregateLikes}
                </span>
              </div>
            </div>
            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-3xl"
            />
            {/* Card Content */}
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-green-600 transition-colors duration-300">
                {recipe.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 mb-3 text-sm">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  Health Score: {recipe.healthScore ?? "N/A"}
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                  Servings: {recipe.servings ?? "N/A"}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                  Cost: ${recipe.pricePerServing ? recipe.pricePerServing : "N/A"}
                </span>
              </div>
              <a
                href={recipe.spoonacularSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full mt-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                  View Recipe
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Custom animation for the heart badge */}
      <style>
        {`
          .animate-bounce-slow {
            animation: bounce 2.5s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-8px);}
          }
        `}
      </style>
    </div>
  );
};

export default SearchedRecipes;