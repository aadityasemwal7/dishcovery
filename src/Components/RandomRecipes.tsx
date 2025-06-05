import React from 'react'
import { Link } from 'react-router-dom';
import HeartIcon from '../../assets/heart.png'; // Assuming you have a heart icon SVG

interface Recipe {
    id: number,
    title: string,
    image: string,
    summary: string,
    aggregateLikes: number,
    healthScore: number | null,
    servings: number | null,
    pricePerServing: number | null,
    spoonacularSourceUrl: string

}

interface RandomRecipesProps {
    randomRecipes: Recipe[]
}

const RandomRecipes : React.FC<RandomRecipesProps> = (props) => {
  return (
    <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Chef's Picks
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {props.randomRecipes.map((recipe) => (
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
              <a href={recipe.spoonacularSourceUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow transition">
                View Recipe
              </button>
              </a>
            </div>
          </div>
            ))}
        </div>
    </div>
  )
}

export default RandomRecipes