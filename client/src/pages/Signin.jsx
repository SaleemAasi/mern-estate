import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart()); // Dispatch signInStart to set loading state to true
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      const data = await res.json();
      console.log(data);
    
      setLoading(false);
    
      if (res.ok) {
        dispatch(signInSuccess({ user: data.user })); // Remove the token here, because it's in cookies
        navigate("/profile"); // Redirect to profile after successful login
      } else {
        dispatch(signInFailure(data.message));
        alert(data.message);
      }
  
    } catch (error) {
      setLoading(false);
      console.error("Error during sign-in:", error);
      dispatch(signInFailure("Something went wrong. Please try again."));
      alert("Something went wrong. Please try again.");
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-600 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin h-5 w-5 border-t-2 border-yellow-500 rounded-full"></div>
                <span className="ml-3">Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <OAuth/>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 my-4">— OR —</div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          Dont have an account?{" "}
          <Link to="/signup" className="text-yellow-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
