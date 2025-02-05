import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",  // Changed 'name' to 'username'
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate(); // Hook to navigate to SignIn page after success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when submitting
  
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
  
      setLoading(false);  // Reset loading state after the response
  
      if (res.ok) {
        // If signup is successful, redirect to the SignIn page
        navigate("/signin");
      } else {
        // Show error message if signup failed
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);  // Reset loading if there's an error
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-gray-600 font-medium">Username</label>
            <input
              type="text"
              name="username"  // Changed 'name' to 'username'
              placeholder="JohnDoe123"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
          </div>

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

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-200"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin h-5 w-5 border-t-2 border-yellow-500 rounded-full"></div>
                <span className="ml-3">Signing Up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 my-4">— OR —</div>

        {/* Sign In Link */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-yellow-500 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
