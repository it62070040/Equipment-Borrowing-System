import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("This Site for "+allowedRoles+" Only")
    console.log("You Role are "+auth.role)
    const check = () => {
        if(auth.role === allowedRoles){
            return true
        }
        else{return false}
    }
    console.log(check())
    return (
        check()
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;