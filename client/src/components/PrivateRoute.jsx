import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const user = useSelector((state) => state.user.user);  // Access user from state.user.user
  const navigate = useNavigate();

  console.log("PrivateRoute - user:", user);  // Debugging log

  if (!user) {
    navigate("/signin");
    return null;
  }

  return <Outlet />;
}
