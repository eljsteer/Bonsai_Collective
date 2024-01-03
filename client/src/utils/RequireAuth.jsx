import { Navigate, Outlet } from 'react-router-dom';
import Auth from "./authClient"; // Adjust the import path as needed

const RequireAuth = () => {
  return Auth.loggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
