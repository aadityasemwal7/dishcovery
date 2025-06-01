import './App.css'
import { useEffect, useState } from 'react'
import Header from './Components/Header'
import SearchComponent from './Components/SearchComponent'
import RandomRecipes from './Components/RandomRecipes'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RecipeDetails from './Components/RecipeDetails'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Login from './Components/Login'
import Register from './Components/Register'
import SearchedRecipes from './Components/SearchedRecipes'

function App() {
  const [randomRecipes, setRandomRecipes] = useState([])
  console.log(randomRecipes)
  
  useEffect(() => {
    const fetchRecipes = async() => {
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

    fetchRecipes()
  }, [])

  return (
    <Router>
      <ConditionalLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route
       path="/" element={
        <ProtectedRoutes>
       <RandomRecipes randomRecipes={randomRecipes} />
       </ProtectedRoutes>
       }>

       </Route>
      <Route
       path="/recipe/:id" element={
        <ProtectedRoutes>
          <RecipeDetails />
        </ProtectedRoutes>
       
       }>
       </Route>
      <Route path="/searched-recipes" element={
        <ProtectedRoutes>
          <SearchedRecipes />
        </ProtectedRoutes>
      }/>


      </Routes>
      </ConditionalLayout>
    </Router>
  )
}

const ConditionalLayout = ({children} : {children: React.ReactNode}) => {
  const location = useLocation()

  if(location.pathname === "/login" || location.pathname === "/register"){
    return <>{children}</>
  }

  return (
    <>
    <Header />
    <ConditionalSearchComponent />
    {children}
    </>
  )
}

function ConditionalSearchComponent() {
  const location = useLocation()

  if(location.pathname === "/"){
    return <SearchComponent />
  }

  return null

}

export default App
