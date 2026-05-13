import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRole,
}) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ROLE CHECK
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;