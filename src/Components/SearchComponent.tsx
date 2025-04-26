import React from 'react';
import image from "../assets/women-eating.jpg"

const SearchComponent = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-lg m-3">
      {/* Slogan */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        "Discover Delicious Recipes for Every Occasion!"
      </h1>

      {/* Food Image */}
      <img
        src={image} // Replace with actual food image URL
        alt="Delicious food"
        className="rounded-xl mb-6 w-full max-w-md object-cover shadow-md"
        
      />

      {/* Search Input */}
      <div className="w-full max-w-md flex items-center bg-white rounded-full shadow-md px-4 py-2">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="flex-grow outline-none text-gray-600 px-2"
        />
        <button
          className="bg-green-500 text-white rounded-full px-4 py-2 font-semibold hover:bg-green-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
