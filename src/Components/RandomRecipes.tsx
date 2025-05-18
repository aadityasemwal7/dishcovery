import React from 'react'
import { Link } from 'react-router-dom';

interface Recipe {
    id: number,
    title: string,
    image: string,
    summary: string,   
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
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
                <Link to={`/recipe/${recipe.id}`}
                  className="text-blue-500 hover:underline mt-2 block">
                  View More
                </Link>
            </div>
            ))}
        </div>
    </div>
  )
}

export default RandomRecipes