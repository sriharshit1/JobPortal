import axios, { InternalAxiosRequestConfig } from "axios";

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

export const setupResponseInterpretor = (navigate:any)=>{
    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        },
        (error)=>{
            if(error.response?.status == 401){
                navigate('/login');
            }
            return Promise.reject(error);
        }
    )
}

export default axiosInstance;