import { useState } from 'react';
import image from "../assets/women-eating.jpg";

const SearchComponent = ({ fetchRecipes }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-green-50 via-white to-green-100 p-8 rounded-3xl shadow-2xl m-6">
      {/* Search Input */}
      <div className="md:w-1/2 w-full flex flex-col items-start md:pr-8 mb-8 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-extrabold text-green-700 mb-8 tracking-tight drop-shadow">
          Savor the Flavor: <span className="text-green-500">Find Recipes That Inspire Every Meal!</span>
        </h1>
        <div className="w-full flex items-center bg-white/70 backdrop-blur-md rounded-full shadow-lg px-6 py-3 border border-green-100">
          <input
            onChange={e => setInputValue(e.target.value)}
            type="text"
            placeholder="Search for recipes..."
            className="flex-grow outline-none text-gray-700 bg-transparent px-2 text-lg font-medium placeholder-gray-400"
          />
          <button
            onClick={() => fetchRecipes(inputValue)}
            className="ml-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-6 py-2 font-bold shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Search
          </button>
        </div>
      </div>

      {/* Food Image */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src={image}
          alt="Delicious food"
          className="rounded-2xl w-full max-w-md object-cover shadow-xl border-4 border-white/80"
        />
      </div>
    </div>
  );
};

export default SearchComponent;