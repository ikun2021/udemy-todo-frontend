import AuthenticationService from "./AuthenticationService.jsx";
import { Navigate } from "react-router";

function AuthenticatedRoute({ children }) {
    return AuthenticationService.isLoggedIn() ? children : <Navigate to="/login" />;
  }

export default AuthenticatedRoute