import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const Swal = require("sweetalert2");
    if(!auth.role){
        // alert error
      Swal.fire({
        title: "Please Login",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        reverseButtons: true,
      });
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