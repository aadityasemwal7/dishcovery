import { use, useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = ({fetchRecipes}) => {
  const {user, logout} = useAuth()
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      console.log(`User logged in: ${user.username}`);
    } else {
      console.log("No user logged in");
    }
  }, [user])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      fetchRecipes(search.trim());
      setSearch("");
    }
    
  }

  return (
    <div className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center">
        <ul className="flex items-center w-full">
          {/* Logo */}
          <Link to={"/"} className="mr-auto">
          <li>
            <div>
              <img width={130} src={Logo} alt="Logo" className="cursor-pointer" />
            </div>
          </li>
          </Link>
          {location.pathname === "/" ? <></> : (<div>
            <li className="flex-1 flex justify-center">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-72 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition"
              >
                Search
              </button>
            </form>
          </li>
          </div>)}
          

          {/* Auth Buttons */}
          {user ? (
            <li className="ml-auto cursor-pointer">
            <button onClick={logout} className="cursor-pointer px-6 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition duration-300">
              Logout
            </button>
          </li>
          ) : (
            <li className="ml-auto cursor-pointer">
            <button className="px-6 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition duration-300">
              Login
            </button>
          </li>
          )}
          <li className="ml-3">
            <button className="cursor-pointer px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition duration-300">
              {
                user ? `hello, ${user.username}` : "Sign Up"
              }
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;