import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const {user, logout} = useAuth()
  console.log(user)
  return (
    <div className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center">
        <ul className="flex items-center w-full">
          {/* Logo */}
          <Link to={"/"}>
          <li className="mr-auto">
            <div>
              <img width={130} src={Logo} alt="Logo" className="cursor-pointer" />
            </div>
          </li>
          </Link>
          {/* Navigation Links */}
          <li className="mx-4 font-semibold text-gray-700 hover:text-red-600 transition duration-300 cursor-pointer">
            Popular Recipes
          </li>

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