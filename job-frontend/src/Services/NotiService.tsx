import axiosInstance from "../Intrceptor/AxiosInterceptor";

const getNotifications =async(id:any)=>{
    return axiosInstance.get(`/notifications/get/${id}`)
    .then(res=>res.data)
    .catch(error=> {throw error;});
}
const readNotifications =async(id:any)=>{
    return axiosInstance.put(`/notifications/read/${id}`)
    .then(res=>res.data)
    .catch(error=> {throw error;});
}
export {getNotifications,readNotifications};
