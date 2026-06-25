import React, { useState, useRef } from "react";
import { FiX, FiPlus } from "react-icons/fi";

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (index: number) => void;
  maxIngredients?: number;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onAdd,
  onRemove,
  maxIngredients = 20,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) return;
    if (ingredients.length >= maxIngredients) return;
    if (ingredients.includes(trimmed)) {
      setInputValue("");
      return;
    }
    onAdd(trimmed);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="w-full">
      {/* Input row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              ingredients.length >= maxIngredients
                ? `Maximum ${maxIngredients} ingredients reached`
                : "Type an ingredient and press Enter..."
            }
            disabled={ingredients.length >= maxIngredients}
            className="w-full px-5 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-md border border-green-200 outline-none text-gray-700 text-lg font-medium placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!inputValue.trim() || ingredients.length >= maxIngredients}
          className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-5 py-3 font-bold shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-green-400 disabled:hover:to-green-600"
        >
          <FiPlus className="text-xl mr-1" />
          Add
        </button>
      </div>

      {/* Ingredient chips */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {ingredients.map((ingredient, index) => (
            <span
              key={`${ingredient}-${index}`}
              className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm shadow-sm border border-green-200 animate-fade-in hover:bg-green-200 transition-colors duration-200"
            >
              {ingredient}
              <button
                onClick={() => onRemove(index)}
                className="ml-1 text-green-600 hover:text-red-500 hover:bg-red-100 rounded-full p-0.5 transition-all duration-200"
                aria-label={`Remove ${ingredient}`}
              >
                <FiX className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="mt-3 text-sm text-gray-500 text-right">
        {ingredients.length}/{maxIngredients} ingredients
      </div>

      {/* Custom animation */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default IngredientInput;
