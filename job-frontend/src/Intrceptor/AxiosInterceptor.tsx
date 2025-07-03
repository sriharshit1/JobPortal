import axios, { InternalAxiosRequestConfig } from "axios";
import Store from "../Store";
import { removeJwt } from "../Slices/JWTSlice";
import { removeUser } from "../Slices/UserSlice";
import { errorNotification } from "../Services/NotificationService";

const axiosInstance = axios.create({
    // baseURL:"http://localhost:8080"
    baseURL:"https://jobportal-cl2e.onrender.com"

})

axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)
let hasAlreadyHandled = false;

export const setupResponseInterpretor = (navigate:any)=>{
    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        },
        // (error)=>{
        //     if(error.response?.status == 401){
        //         navigate('/login');
        //     }
        //     return Promise.reject(error);
        // }
        (error)=>{
            if(error.response?.status === 401 || error.response?.status === 403){

                if(!hasAlreadyHandled){

                
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                Store.dispatch(removeJwt());
                Store.dispatch(removeUser());

                errorNotification("Session Expired","Please Login again");

                navigate("/login");

            }
        }
            return Promise.reject(error);
        }
    )
}

export default axiosInstance;