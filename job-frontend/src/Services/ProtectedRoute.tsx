import { jwtDecode } from "jwt-decode";
import { JSX, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "../Services/NotificationService"; // adjust if needed
import { Loader } from "@mantine/core"; // or your custom loader

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = useSelector((state: any) => state.jwt);
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const notificationShown = useRef(false); // 🛡️ prevent multiple notifications

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (allowedRoles && !allowedRoles.includes(decoded.accountType)) {
        if (!notificationShown.current) {
          notificationShown.current = true;
          errorNotification("Unauthorized", "You are not allowed to access this page.");
          setShowLoader(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    } catch (err) {
      navigate("/login");
    }
  }, [token, allowedRoles, navigate]);

  if (showLoader) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[1000]">
        <Loader color="yellow" size="xl" />
      </div>
    );
  }

  if (isAuthorized === null) return null;

  return isAuthorized ? children : null;
};

export default ProtectedRoute;







// import { jwtDecode } from "jwt-decode";
// import { JSX } from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps{
//     children :JSX.Element;
//     allowedRoles:string[];
// }

// const ProtectedRoute:React.FC<ProtectedRouteProps>=({children , allowedRoles})=>{
//     const token = useSelector((state:any)=>state.jwt)
//     if(!token){
//         return <Navigate to="/login"/>
//     }
//         const decoded:any = jwtDecode(token);
//         if(allowedRoles && !allowedRoles.includes(decoded.accountType)) return <Navigate to= "/unauthorized"/>

    
//     return children;
// }

// export default ProtectedRoute;