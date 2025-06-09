import React from "react";
import HeartIcon from "../../assets/heart.png";

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  aggregateLikes: number;
  healthScore: number | null;
  servings: number | null;
  pricePerServing: number | null;
  spoonacularSourceUrl: string;
}

interface RandomRecipesProps {
  randomRecipes: Recipe[];
}

const RandomRecipes: React.FC<RandomRecipesProps> = (props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-10 text-center drop-shadow-lg tracking-tight">
        Recipes You Might Like
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {props.randomRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="relative group bg-white/70 backdrop-blur-lg border border-green-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
          >
            {/* Heart Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="relative w-10 h-10 flex items-center justify-center animate-bounce-slow">
                <img
                  src={HeartIcon}
                  className="w-full h-full rounded-full border-2 border-pink-200 shadow"
                  alt="likes"
                />
                <span className="absolute inset-0 flex items-center justify-center text-pink-600 font-bold text-sm pointer-events-none">
                  {recipe.aggregateLikes}
                </span>
              </div>
            </div>
            {/* Recipe Image */}
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-3xl"
              />
              {/* Tooltip summary on hover */}
              <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 bg-black/70 text-white text-xs p-3 rounded-b-3xl transition-opacity duration-300 z-20">
                <span dangerouslySetInnerHTML={{ __html: recipe.summary.slice(0, 120) + "..." }} />
              </div>
            </div>
            {/* Card Content */}
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-green-600 transition-colors duration-300">
                {recipe.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 mb-4 text-xs md:text-sm">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium shadow">
                  Health Score: {recipe.healthScore ?? "N/A"}
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium shadow">
                  Servings: {recipe.servings ?? "N/A"}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium shadow">
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

export default RandomRecipes;