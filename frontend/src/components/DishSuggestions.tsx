import React from "react";
import { GiMeal } from "react-icons/gi";

interface Suggestion {
  name: string;
  description: string;
  matchedIngredients: string[];
  cuisine: string;
}

interface DishSuggestionsProps {
  suggestions: Suggestion[];
  onSelectDish: (dishName: string) => void;
}

const cuisineColors: Record<string, { bg: string; text: string }> = {
  Italian: { bg: "bg-red-100", text: "text-red-700" },
  Asian: { bg: "bg-amber-100", text: "text-amber-700" },
  Thai: { bg: "bg-orange-100", text: "text-orange-700" },
  Indian: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Mexican: { bg: "bg-rose-100", text: "text-rose-700" },
  American: { bg: "bg-blue-100", text: "text-blue-700" },
  Mediterranean: { bg: "bg-cyan-100", text: "text-cyan-700" },
  French: { bg: "bg-violet-100", text: "text-violet-700" },
  Japanese: { bg: "bg-pink-100", text: "text-pink-700" },
  Chinese: { bg: "bg-red-100", text: "text-red-600" },
  Spanish: { bg: "bg-orange-100", text: "text-orange-700" },
  Korean: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

const getDefaultCuisineStyle = () => ({
  bg: "bg-purple-100",
  text: "text-purple-700",
});

const DishSuggestions: React.FC<DishSuggestionsProps> = ({
  suggestions,
  onSelectDish,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg mb-3">
          <GiMeal className="text-2xl text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 drop-shadow tracking-tight">
          Dishes You Can Make
        </h2>
        <p className="text-gray-500 mt-1 font-medium">
          Click any dish to find full recipes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {suggestions.map((suggestion, index) => {
          const cuisineStyle =
            cuisineColors[suggestion.cuisine] || getDefaultCuisineStyle();

          return (
            <div
              key={`${suggestion.name}-${index}`}
              onClick={() => onSelectDish(suggestion.name)}
              className="group relative bg-white/80 backdrop-blur-md border border-green-100 rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectDish(suggestion.name);
                }
              }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-600/0 group-hover:from-green-400/5 group-hover:to-green-600/10 transition-all duration-300 rounded-2xl" />

              <div className="relative z-10">
                {/* Dish Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {suggestion.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  {suggestion.description}
                </p>

                {/* Tags row */}
                <div className="flex flex-wrap gap-2">
                  {/* Cuisine tag */}
                  <span
                    className={`${cuisineStyle.bg} ${cuisineStyle.text} px-3 py-1 rounded-full text-xs font-semibold shadow-sm`}
                  >
                    {suggestion.cuisine}
                  </span>

                  {/* Matched ingredient tags */}
                  {suggestion.matchedIngredients.map((ing, i) => (
                    <span
                      key={`${ing}-${i}`}
                      className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Click hint */}
              <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-green-500 font-semibold">
                Click to search →
              </div>
            </div>
          );
        })}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .grid > div {
            animation: slide-up 0.4s ease-out both;
          }
          .grid > div:nth-child(1) { animation-delay: 0.05s; }
          .grid > div:nth-child(2) { animation-delay: 0.1s; }
          .grid > div:nth-child(3) { animation-delay: 0.15s; }
          .grid > div:nth-child(4) { animation-delay: 0.2s; }
          .grid > div:nth-child(5) { animation-delay: 0.25s; }
          .grid > div:nth-child(6) { animation-delay: 0.3s; }
        `}
      </style>
    </div>
  );
};

export default DishSuggestions;
