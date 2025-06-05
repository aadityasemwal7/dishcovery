// App.tsx
import './App.css'
import { useEffect, useState } from 'react'
import Header from './Components/Header'
import SearchComponent from './Components/SearchComponent'
import RandomRecipes from './Components/RandomRecipes'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import RecipeDetails from './Components/RecipeDetails'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Login from './Components/Login'
import Register from './Components/Register'
import SearchedRecipes from './Components/SearchedRecipes'

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

function AppRoutes() {
  const [randomRecipes, setRandomRecipes] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const fetchRecipes = async (name: string) => {
    const api_key = "0484e81779be44a88126582db219903c";
    try {
      setLoading(true);
      console.log("Loading started...")
      const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(name)}&number=20&apiKey=${api_key}`);
      const data = await res.json();
      const results = data.results || [];
      const detailedRecipes = await Promise.all(
        results.map(async (recipe: any) => {
          const detailsRes = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${api_key}`);
          return await detailsRes.json();
        })
      );

      navigate('/searched-recipes', { state: { recipes: detailedRecipes } });
    } catch (err) {
      console.log(`error message : ${err}`);
    }finally {
      setLoading(false);
      console.log("Loading finished...")
    }
  };

  useEffect(() => {
    const fetchRandomRecipes = async() => {
      try {
        const api_key = "0484e81779be44a88126582db219903c"
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${api_key}`)
        if(!response.ok){
          console.log("failed to fetch api")
        }
        const res = await response.json()
        setRandomRecipes(res.recipes || [])
      }
      catch(err) {
        console.log(`error message : ${err}`)
      }
    }

    fetchRandomRecipes()
  }, [])

  return (
    <ConditionalLayout loading={loading} fetchRecipes={fetchRecipes} randomRecipes={randomRecipes} />
  )
}

const ConditionalLayout = ({children, fetchRecipes, randomRecipes, loading}: any) => {
  const location = useLocation()

  if(loading){
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
      </div>
    )
  }

  if(location.pathname === "/login" || location.pathname === "/register"){
    return <>{children}</>
  }

  return (
    <>
      <Header fetchRecipes={fetchRecipes} loading={loading}/>
      <ConditionalSearchComponent fetchRecipes={fetchRecipes} />
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <RandomRecipes randomRecipes={randomRecipes} />
          </ProtectedRoutes>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={
          <ProtectedRoutes>
            <RecipeDetails />
          </ProtectedRoutes>
        } />
        <Route path="/searched-recipes" element={
          <ProtectedRoutes>
            <SearchedRecipes />
          </ProtectedRoutes>
        } />
      </Routes>
      {children}
    </>
  )
}

function ConditionalSearchComponent({ fetchRecipes }: any) {
  const location = useLocation()



  if(location.pathname === "/"){
    return <SearchComponent fetchRecipes={fetchRecipes} />
  }

  return null
}

export default App