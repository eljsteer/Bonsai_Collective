import { Navigate, Outlet } from 'react-router-dom';
import Auth from "./authClient";

//// ------ Function to check if user is logged in before navigating to private pages ------->>
const RequireAuth = () => {
  return Auth.loggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
