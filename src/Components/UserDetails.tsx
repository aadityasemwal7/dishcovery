import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

const getInitials = (name: string) =>
  name
    ? name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "U";

const UserDetails: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Change Password",
      html:
        '<input id="swal-curr" type="password" class="swal2-input" placeholder="Current Password">' +
        '<input id="swal-new" type="password" class="swal2-input" placeholder="New Password">',
      focusConfirm: false,
      preConfirm: () => {
        const curr = (document.getElementById("swal-curr") as HTMLInputElement).value;
        const newP = (document.getElementById("swal-new") as HTMLInputElement).value;
        if (!curr || !newP) {
          Swal.showValidationMessage("Both fields are required");
          return;
        }
        return { currPassword: curr, newPassword: newP };
      }
    });

    if (!formValues) return;

    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/update-password`,
        formValues,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      Swal.fire({
        icon: "success",
        title: "Password updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Could not update password.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/update`,
        { username, email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      login(res.data.user);
      Swal.fire({
        icon: "success",
        title: "Profile updated!",
        timer: 1500,
        showConfirmButton: false,
      });
      setEditMode(false);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err.response?.data?.message || "Could not update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-100 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="circles"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="8" fill="#22c55e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circles)" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-green-200 p-10">
        <div className="flex flex-col items-center mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-lg mb-4 border-4 border-white">
            {getInitials(user?.username)}
          </div>
          <h2 className="text-3xl font-extrabold text-green-700 mb-1 drop-shadow text-center">
            {user?.username}
          </h2>
          <p className="text-gray-500 text-lg text-center">
            Your DishCovery Profile
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-green-600 font-bold text-lg w-32">
              Username:
            </span>
            {editMode ? (
              <input
                type="text"
                className="border border-green-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-green-400 transition w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoFocus
              />
            ) : (
              <span className="text-gray-800 text-lg font-medium">
                {user.username}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-green-600 font-bold text-lg w-32">
              Email:
            </span>
            {editMode ? (
              <input
                type="email"
                className="border border-green-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-green-400 transition w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            ) : (
              <span className="text-gray-800 text-lg font-medium">
                {user.email}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-10">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-bold shadow hover:from-green-500 hover:to-green-700 transition-all duration-300 disabled:opacity-60"
              >
                <FiSave className="text-xl" />
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setUsername(user.username);
                  setEmail(user.email);
                }}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold shadow hover:bg-gray-300 transition-all duration-300"
              >
                <FiX className="text-xl" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-bold shadow hover:from-green-500 hover:to-green-700 transition-all duration-300"
              >
                <FiEdit2 className="text-xl" />
                Edit
              </button>
              <button
                onClick={handleUpdatePassword}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-bold shadow hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
              >
                Change Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
