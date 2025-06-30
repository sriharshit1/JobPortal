import { jwtDecode } from "jwt-decode"

export const safeDecodeJwt = (token: string | null)=>{
    if(token && token.split(".").length === 3){
        try{
            return jwtDecode(token);
        }
        catch(e){
            console.log("JWT decoding failed:",e);
        }
    }
    return null;
};