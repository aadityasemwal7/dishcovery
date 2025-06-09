// App.tsx
import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import SearchComponent from "./Components/SearchComponent";
import RandomRecipes from "./Components/RandomRecipes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import RecipeDetails from "./Components/RecipeDetails";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SearchedRecipes from "./Components/SearchedRecipes";
import UserDetails from  "./Components/userDetails";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchingFor, setSearchingFor] = useState<string>("");

  const navigate = useNavigate();

  const fetchRecipes = async (name: string) => {
    const api_key = "0484e81779be44a88126582db219903c";
    try {
      setSearchingFor(name);
      setLoading(true);
      console.log("Loading started...");
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
          name
        )}&number=1&apiKey=${api_key}`
      );
      const data = await res.json();
      const results = data.results || [];
      const detailedRecipes = await Promise.all(
        results.map(async (recipe: any) => {
          const detailsRes = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${api_key}`
          );
          return await detailsRes.json();
        })
      );

      navigate("/searched-recipes", { state: { recipes: detailedRecipes } });
    } catch (err) {
      console.log(`error message : ${err}`);
    } finally {
      setLoading(false);
      setSearchingFor("");
      console.log("Loading finished...");
    }
  };

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const api_key = "0484e81779be44a88126582db219903c";
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=6&apiKey=${api_key}`
        );
        if (!response.ok) {
          console.log("failed to fetch api");
        }
        const res = await response.json();
        setRandomRecipes(res.recipes || []);
      } catch (err) {
        console.log(`error message : ${err}`);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <ConditionalLayout
      loading={loading}
      fetchRecipes={fetchRecipes}
      randomRecipes={randomRecipes}
      searchingFor={searchingFor}
    />
  );
}

const ConditionalLayout = ({
  fetchRecipes,
  randomRecipes,
  loading,
  searchingFor
}) => {
  const location = useLocation();

  // Show header and search only for non-auth routes
  const showHeaderAndSearch = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {showHeaderAndSearch && (
        <>
          <Header fetchRecipes={fetchRecipes} loading={loading} />
          <ConditionalSearchComponent fetchRecipes={fetchRecipes} searchingFor={searchingFor} loading={loading} />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <RandomRecipes randomRecipes={randomRecipes} />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoutes>
              <RecipeDetails />   
            </ProtectedRoutes>
          }
        />
        <Route
          path="/searched-recipes"
          element={
            <ProtectedRoutes>
              <SearchedRecipes />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
};

interface ConditionalSearchComponentProps {
  fetchRecipes: (name: string) => void;
  loading: boolean;
  searchingFor: string
}

function ConditionalSearchComponent({ fetchRecipes, loading, searchingFor } : ConditionalSearchComponentProps) {
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-100/80 via-white/80 to-green-200/80 backdrop-blur-md z-50 transition-all duration-300">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 border-solid shadow-xl mb-6"></div>
        {searchingFor && (
          <div className="text-2xl font-extrabold text-green-700 animate-pulse drop-shadow mb-2">
            Searching for <span className="capitalize text-green-600">"{searchingFor}"</span>...
          </div>
        )}
        <div className="text-sm text-gray-500 italic">Fetching delicious recipes for you!</div>
      </div>
    );
  }

  if (location.pathname === "/") {
    return <SearchComponent fetchRecipes={fetchRecipes} loading={loading} />;
  }

  return null;
}

export default App;
