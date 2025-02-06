import { useNavigate } from "react-router-dom";  // Import useNavigate
import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice"; // Your action for successful sign-in

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function

  const handleGoogleSignIn = async () => {
    try {
      console.log("Attempting Google sign-in...");
  
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
  
      const user = result.user;
      console.log("Google sign-in successful:", user);
  
      // Dispatch the user data to Redux store
      dispatch(signInSuccess(user));
  
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("User data sent successfully:", data);
        // Navigate to the home page after successful sign-in
        navigate("/");  // Redirect to home page
      } else {
        console.error("Error:", data.message);
        alert("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full text-center mt-4">
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Continue with Google
      </button>
    </div>
  );
}
