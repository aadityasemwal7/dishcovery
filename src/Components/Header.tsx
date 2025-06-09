import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

interface HeaderProps {
  fetchRecipes: (name: string) => void;
  loading?: boolean;
}

interface UserType {
  username: string;
  email: string;
  id?: string;
}

const Header: React.FC<HeaderProps> = ({ fetchRecipes, loading }) => {
  const auth = useAuth() as { user: UserType | null; logout: () => void };
  const user = auth?.user;
  const logout = auth?.logout;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      console.log(`User logged in: ${user.username}`);
    } else {
      console.log("No user logged in");
    }
  }, [user]);

  const handleLogout = () => {
    if (logout) logout();
    navigate("/");
    console.log("user logged out!");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      fetchRecipes(search.trim());
      setSearch("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-lg">
      <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            width={120}
            src={Logo}
            alt="Logo"
            className="cursor-pointer drop-shadow-md"
          />
        </Link>

        {/* Search Bar */}
        {location.pathname !== "/" && (
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white/90 rounded-full shadow-md border border-green-200 px-2 py-1 mx-6 w-80 max-w-full"
          >
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 bg-transparent outline-none text-gray-700 rounded-l-full"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-4 py-2 ml-2 hover:from-green-500 hover:to-green-700 transition"
            >
              <FiSearch className="text-xl" />
            </button>
          </form>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-red-500 text-red-600 rounded-full font-medium hover:bg-red-600 hover:text-white transition duration-300 shadow"
              >
                Logout
              </button>
              <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold shadow">
                <Link to="/user-details">
                  <span className="mr-2">Hello,</span>
                  {user.username}
                </Link>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 border border-green-500 text-green-600 rounded-full font-medium hover:bg-green-600 hover:text-white transition duration-300 shadow"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-medium hover:from-green-500 hover:to-green-700 transition duration-300 shadow"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;