import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "../assets/logo.png"; // Use your logo path

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "New user has been registered!",
        text: "Redirecting you to login page!",
        timer: 2500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-white to-blue-100 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="8" fill="#3b82f6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circles)" />
        </svg>
      </div>
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-blue-100 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="DishCovery Logo" className="w-20 h-20 rounded-full shadow-lg mb-2 border-4 border-white" />
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-2 drop-shadow">
            Create Account
          </h1>
          <p className="text-center text-gray-500 mb-2 font-medium">
            Join DishCovery and start your flavor journey!
          </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 shadow-sm transition placeholder-gray-400 text-lg"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 shadow-sm transition placeholder-gray-400 text-lg"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 shadow-sm transition placeholder-gray-400 text-lg"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 shadow-sm transition placeholder-gray-400 text-lg"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 text-lg tracking-wide"
          >
            Register
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold transition"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;