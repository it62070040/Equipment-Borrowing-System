import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    if(!auth.role){
        alert("Please Login")
    }
    const check = () => {
        if(auth.role === allowedRoles){
            return true
        }
        else{return false}
    }
    return (
        check()
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;