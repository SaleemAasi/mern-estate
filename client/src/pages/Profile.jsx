import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useState, useEffect } from "react";

export default function Profile() {
  const { user } = useSelector((state) => state.user); // Get the user from Redux store
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  // Update form data when the user object changes
  useEffect(() => {
    if (user) {
      console.log("User data:", user); // Debugging user data
      setFormData({
        name: user.username || "", // Set the name from the user object
        email: user.email || "", // Set the email from the user object
        profileImage: user.profileImage || "", // Set the profile image if available
      });
    }
  }, [user]); // Re-run this effect whenever 'user' changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch an action to update the user profile (optional)
    console.log("Updated Profile Data:", formData);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleDeleteAccount = () => {
    // Dispatch an action to delete the account (optional)
    console.log("Account Deleted");
  };

  // Check if user is loading
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <img
            src={formData.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
          />
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
              type="url"
              id="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Sign Out
        </button>

        {/* Delete Account Button */}
        <button
          onClick={handleDeleteAccount}
          className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
