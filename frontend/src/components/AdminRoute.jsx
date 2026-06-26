
import {Navigate} from "react-router-dom";

function AdminRoute({children}){

    const token = localStorage.getItem("token");

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if(!token || !user){
        return <Navigate to="/" />
    }

    if(user.role !== "admin"){
        return <Navigate to="/dashboard" />
    }

    return children

}

export default AdminRoute;