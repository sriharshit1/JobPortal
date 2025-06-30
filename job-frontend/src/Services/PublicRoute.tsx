import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps{
    children:JSX.Element;
}


const PublicRoute:React.FC<PublicRouteProps>=({children})=>{
    const token = useSelector((state:any)=>state.jwt)
    const jwtFromStorage = localStorage.getItem("token");
    if(token || jwtFromStorage){
        return <Navigate to="/"/>
    }
    return children;
}

export default PublicRoute;