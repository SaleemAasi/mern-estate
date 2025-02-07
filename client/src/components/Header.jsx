import { FaSearch, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const image = "https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"; // Default image URL

export default function Header() {
  const { user } = useSelector(state => state.user); // Correctly use user instead of currentUser
  const [menuOpen, setMenuOpen] = useState(false);

  // Use the user's profile image if available, else use the default image
  const profileImage = user?.profileImage || image;

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg sm:text-2xl flex items-center space-x-1">
          <span className="text-yellow-500">Saleem</span>
          <span className="text-gray-800">Estate</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 justify-center">
          <form className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full p-3 pl-10 bg-gray-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          </form>
        </div>

        {/* Navigation */}
        <nav className="hidden sm:flex space-x-6 text-gray-700">
          <Link to="/" className="hover:text-yellow-500 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-500 transition">About</Link>

          {/* Conditionally render Sign In or Profile */}
          {user ? (
            <Link to="/profile" className="flex items-center">
              <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
            </Link>
          ) : (
            <Link to="/signin" className="hover:text-yellow-500 transition">Sign In</Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <Link to="/" className="block py-3 text-center text-gray-700 hover:bg-gray-100">
            Home
          </Link>
          <Link to="/about" className="block py-3 text-center text-gray-700 hover:bg-gray-100">
            About
          </Link>

          {/* Conditionally render Sign In or Profile */}
          {user ? (
            <Link to="/profile" className="block py-3 text-center text-gray-700 hover:bg-gray-100">
              <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
            </Link>
          ) : (
            <Link to="/signin" className="block py-3 text-center text-gray-700 hover:bg-gray-100">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
