import { useLocation, Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";
const RequireAuth = ({ allowedRoles }) => {
    const { user } = useApp();
    const location = useLocation();
    var isAuth
        if(user === null){
          isAuth = false
        }
        else{
                if(user.role === allowedRoles){
                    isAuth = true
                }
                else{isAuth = false}
                console.log(user.role, isAuth)    
        }
    
    return (
            isAuth
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;