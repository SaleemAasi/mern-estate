import { useSelector, useDispatch } from "react-redux";
import { signOut, updateUserStart, updateUserSuccess, updateFailure } from "../redux/user/userSlice";
import { useState, useEffect } from "react";

export default function Profile() {
  const { user } = useSelector((state) => state.user); // Get user and token from Redux store
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "", // Changed 'name' to 'username'
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      console.log("User object from Redux:", user);
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating profile...");

    try {
      dispatch(updateUserStart());

      console.log("Sending request to backend...");

      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      console.log("Response from backend:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      dispatch(updateUserSuccess(data.user)); // Update user info in Redux
      console.log("Profile updated successfully:", data);
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.error("Error updating profile:", error);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      const data = await res.json();
      console.log("Delete response:", data);
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete account");
      }
  
      dispatch(signOut()); // Sign out the user after deletion
      alert("Your account has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };
  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="username" // Changed from 'name' to 'username'
              value={formData.username}
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>

        <button
          onClick={handleSignOut}
          className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Sign Out
        </button>

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
