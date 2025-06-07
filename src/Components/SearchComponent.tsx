import {useState} from 'react';
import image from "../assets/women-eating.jpg";


const SearchComponent = ({fetchRecipes}) => {
  const [inputValue, setInputValue] = useState('');
  // const [recipes, setRecipes] = useState([]);
  // const navigate = useNavigate();


  // const fetchRecipes = async(name: string) => {
  //   const api_key = "0484e81779be44a88126582db219903c"
    
  //   try{
  //     const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(name)}&number=20&apiKey=${api_key}`)
  //     const data = await res.json()
  //     const results = data.results || []
      
  //     const detailedRecipes = await Promise.all(
  //       results.map(async (recipe: any) => {
  //         const detailsRes = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${api_key}`)
  //         return await detailsRes.json()
  //       })
  //     )
  //     setRecipes(detailedRecipes)
  //     navigate('/searched-recipes', { state: { recipes: detailedRecipes }});
  //   }catch(err){
  //     console.log(`error message : ${err}`)
  //   }
  // }
  
  

  return (
    <div className="flex flex-row items-center bg-gray-100 p-6 rounded-2xl shadow-lg m-3">
      {/* Search Input */}
      <div className="w-1/2 flex flex-col items-start pr-6">
        <h1 className="text-lg font-bold text-gray-800 mb-6">
          "Savor the Flavor: Find Recipes That Inspire Every Meal!"
        </h1>
        <div className="w-full flex items-center bg-white rounded-full shadow-md px-4 py-2">
          <input
            onChange={e => setInputValue(e.target.value)}
            type="text"
            placeholder="Search for recipes..."
            className="flex-grow outline-none text-gray-600 px-2"
          />
          <button
            onClick={() => fetchRecipes(inputValue)} className="bg-green-500 text-white rounded-full px-4 py-2 font-semibold hover:bg-green-600 transition"
          >
        	Search	
          </button>
        </div>
      </div>

      {/* Food Image */}
      <div className="w-1/2 flex justify-center">
        <img
          src={image}
          alt="Delicious food"
          className="rounded-xl w-full max-w-md object-cover shadow-md"
        />
      </div>
    </div>
  );
};

export default SearchComponent;