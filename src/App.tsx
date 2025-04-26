import './App.css'
import { useEffect, useState } from 'react'
import Header from './Components/Header'
import SearchComponent from './Components/SearchComponent'

function App() {
  const [randomRecipes, setRandomRecipes] = useState([])
  

  useEffect(() => {
    const fetchRecipes = async() => {
      try {
        const api_key = "0484e81779be44a88126582db219903c"
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${api_key}`)
        if(!response.ok){
          console.log("failed to fetch api")
        }
        const res = await response.json()
        setRandomRecipes(res)
      }
      catch(err) {
        console.log(`error message : ${err}`)
      }
    }

    // fetchRecipes()
  })

  return (
    <div>
      <Header />
      <SearchComponent />
    </div>
  )
}

export default App
