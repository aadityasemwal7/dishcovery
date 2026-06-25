import { useState, useRef, useCallback } from "react";
import IngredientInput from "./IngredientInput";
import DishSuggestions from "./DishSuggestions";
import { GiCookingPot } from "react-icons/gi";
import { FiAlertTriangle, FiWifiOff, FiRefreshCw } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "https://dishcovery-backend-4ggb.onrender.com";

interface Suggestion {
  name: string;
  description: string;
  matchedIngredients: string[];
  cuisine: string;
}

interface CookWithIngredientsProps {
  fetchRecipes: (name: string) => void;
}

const CookWithIngredients: React.FC<CookWithIngredientsProps> = ({
  fetchRecipes,
}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorType, setErrorType] = useState<"network" | "api" | "">("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleAddIngredient = (ingredient: string) => {
    setIngredients((prev) => [...prev, ingredient]);
    // Clear previous errors when ingredients change
    if (error) {
      setError("");
      setErrorType("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
    if (error) {
      setError("");
      setErrorType("");
    }
  };

  const handleFindDishes = useCallback(async () => {
    if (ingredients.length === 0) return;

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError("");
    setErrorType("");
    setSuggestions([]);
    setHasSearched(false);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/api/recipes/suggest-dishes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ingredients }),
          signal: controller.signal,
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          data.message || `Server error (${res.status}). Please try again.`;
        setErrorType("api");
        throw new Error(message);
      }

      const data = await res.json();
      const resultSuggestions = data.suggestions || [];
      setSuggestions(resultSuggestions);
      setHasSearched(true);
    } catch (err: any) {
      // Don't show error if the request was intentionally aborted
      if (err.name === "AbortError") return;

      if (!errorType) {
        // Network-level failure (fetch threw before getting a response)
        if (
          err.message === "Failed to fetch" ||
          err.message.includes("NetworkError") ||
          err.message.includes("network")
        ) {
          setErrorType("network");
          setError(
            "Could not connect to the server. Please check your internet connection and try again."
          );
        } else {
          setErrorType("api");
          setError(err.message || "Something went wrong. Please try again.");
        }
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [ingredients, errorType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10 animate-header-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg mb-4 animate-header-icon">
            <GiCookingPot className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 drop-shadow-lg tracking-tight">
            What Can I Cook?
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">
            Add your available ingredients and let AI suggest delicious dishes!
          </p>
        </div>

        {/* Ingredient Input */}
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-green-100 p-8 mb-8 transition-all duration-300">
          <IngredientInput
            ingredients={ingredients}
            onAdd={handleAddIngredient}
            onRemove={handleRemoveIngredient}
          />

          {/* Find Dishes Button */}
          <button
            onClick={handleFindDishes}
            disabled={ingredients.length === 0 || loading}
            className="w-full mt-6 py-4 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:from-green-400 disabled:hover:to-green-600"
          >
            {loading ? (
              <span className="inline-flex items-center gap-3">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                AI is thinking...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                🍳 Find Dishes I Can Make
              </span>
            )}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div
            className={`rounded-2xl p-5 mb-8 flex items-start gap-4 animate-error-slide-in ${
              errorType === "network"
                ? "bg-amber-50 border border-amber-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {errorType === "network" ? (
                <FiWifiOff className="text-xl text-amber-500" />
              ) : (
                <FiAlertTriangle className="text-xl text-red-500" />
              )}
            </div>
            <div className="flex-grow">
              <p
                className={`font-semibold ${
                  errorType === "network" ? "text-amber-700" : "text-red-600"
                }`}
              >
                {error}
              </p>
            </div>
            <button
              onClick={handleFindDishes}
              disabled={loading}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
            >
              <FiRefreshCw className={`text-sm ${loading ? "animate-spin" : ""}`} />
              Retry
            </button>
          </div>
        )}

        {/* Skeleton Loading State */}
        {loading && (
          <div className="mt-2 animate-skeleton-fade-in">
            {/* Loading header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-full px-6 py-3 shadow-md border border-green-100">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500"></span>
                <span className="text-green-700 font-semibold animate-pulse">
                  Analyzing your ingredients with AI...
                </span>
              </div>
            </div>

            {/* Skeleton cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/60 backdrop-blur-md border border-green-100 rounded-2xl p-6 shadow-md overflow-hidden"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {/* Shimmer overlay */}
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                  {/* Title skeleton */}
                  <div className="h-5 bg-gray-200/70 rounded-full w-3/4 mb-3 animate-pulse" />

                  {/* Description skeleton */}
                  <div className="h-3 bg-gray-100/70 rounded-full w-full mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-100/70 rounded-full w-5/6 mb-4 animate-pulse" />

                  {/* Tags skeleton */}
                  <div className="flex gap-2">
                    <div className="h-6 bg-purple-100/50 rounded-full w-20 animate-pulse" />
                    <div className="h-6 bg-green-100/50 rounded-full w-16 animate-pulse" />
                    <div className="h-6 bg-green-100/50 rounded-full w-14 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State — AI returned no suggestions */}
        {hasSearched && suggestions.length === 0 && !error && !loading && (
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-green-100 p-10 mb-8 text-center animate-empty-pop">
            <div className="text-5xl mb-4">🤔</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No dishes found
            </h3>
            <p className="text-gray-500 font-medium">
              Try adding more ingredients or different combinations to get suggestions.
            </p>
          </div>
        )}

        {/* AI Dish Suggestions */}
        <DishSuggestions
          suggestions={suggestions}
          onSelectDish={fetchRecipes}
        />
      </div>

      {/* Global animations for this page */}
      <style>
        {`
          @keyframes header-fade-in {
            from { opacity: 0; transform: translateY(-12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-header-fade-in {
            animation: header-fade-in 0.5s ease-out;
          }

          @keyframes header-icon-pop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-header-icon {
            animation: header-icon-pop 0.6s ease-out 0.1s both;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 1.8s ease-in-out infinite;
          }

          @keyframes skeleton-fade-in {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-skeleton-fade-in {
            animation: skeleton-fade-in 0.3s ease-out;
          }

          @keyframes error-slide-in {
            from { opacity: 0; transform: translateY(-8px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-error-slide-in {
            animation: error-slide-in 0.3s ease-out;
          }

          @keyframes empty-pop {
            0% { opacity: 0; transform: scale(0.95); }
            70% { transform: scale(1.02); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-empty-pop {
            animation: empty-pop 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default CookWithIngredients;
