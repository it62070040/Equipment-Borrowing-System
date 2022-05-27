import { useLocation, Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";
const RequireAuth = ({ allowedRoles }) => {
    const { user } = useApp();
    const location = useLocation();
    const Swal = require("sweetalert2");
    
    var isAuth
        if(user === null){
            Swal.fire({
                title: "Please Login",
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
                reverseButtons: true,
              });
          isAuth = false
        }
        else{
                if(user.role === allowedRoles){
                    isAuth = true
                }
                else{isAuth = false}
        }
    
    return (
            isAuth
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;