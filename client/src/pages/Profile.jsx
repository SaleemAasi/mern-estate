import { useSelector, useDispatch } from "react-redux";
import { signOut, updateUserStart, updateUserSuccess, updateFailure } from "../redux/user/userSlice";
import { useState, useEffect } from "react";

export default function Profile() {
  const { user } = useSelector((state) => state.user); // Get user and token from Redux store
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error state for handling errors

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleCreateListing = async () => {
    try {
      const res = await fetch(`/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ /* Replace with your listing data */ }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create listing");
      }
      console.log("Listing created successfully:", data);
    } catch (error) {
      console.error("Error creating listing:", error);
      setError("Failed to create listing. Please try again."); // Set error
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating profile...");

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      dispatch(updateUserSuccess(data.user));
      console.log("Profile updated successfully:", data);
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.error("Error updating profile:", error);
      setError("Profile update failed. Please try again.");
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
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      dispatch(signOut());
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

        {error && <div className="text-red-600 text-center mb-4">{error}</div>} {/* Error Message */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
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
          onClick={handleCreateListing}
          className="w-full mt-4 bg-yellow-950 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          CREATE LISTING
        </button>

        <div className="flex mt-4 space-x-4">
          <button
            onClick={handleSignOut}
            className="w-full text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition duration-300"
          >
            Sign Out
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition duration-300"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
