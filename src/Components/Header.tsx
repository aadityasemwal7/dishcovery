import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const {user, logout} = useAuth()

  return (
    <div className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center">
        <ul className="flex items-center w-full">
          {/* Logo */}
          <li className="mr-auto">
            <div>
              <img width={130} src={Logo} alt="Logo" className="cursor-pointer" />
            </div>
          </li>

          {/* Navigation Links */}
          <li className="mx-4 font-semibold text-gray-700 hover:text-red-600 transition duration-300 cursor-pointer">
            Popular Recipes
          </li>

          {/* Auth Buttons */}
          {user ? (
            <li className="ml-auto">
            <button onClick={logout} className="px-6 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition duration-300">
              Logout
            </button>
          </li>
          ) : (
            <li className="ml-auto">
            <button className="px-6 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition duration-300">
              Login
            </button>
          </li>
          )}
          <li className="ml-3">
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition duration-300">
              SignUp
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;