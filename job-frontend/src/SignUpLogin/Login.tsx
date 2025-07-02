import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FromValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import { loginUser } from "../Services/AuthService";
import { setJwt } from "../Slices/JWTSlice";
import { jwtDecode } from "jwt-decode";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { safeDecodeJwt } from "../Slices/SafeDecodeJwt";

const form={
    email:"",
    password:"",
}

const Login = () => {
  const [loading,setLoading] = useState(false);
  const dispatch=useDispatch();

    // const [data,setData]=useState(form);
    const [data, setData] = useState<{[key:string]:string}>(form);
     const [formError, setFormError] = useState<{[key:string]:string}>(form);
     const navigate = useNavigate();
     const[opened, {open,close}] = useDisclosure(false);

  
      const handleChange=(event:any)=>{
        setFormError({...formError ,[event.target.name]:""});
               setData({...data,[event.target.name]:event.target.value})
      }
  
      const handleSubmit=()=>{
        
         let valid = true,newFormError:{[key:string]:string}={};
    for (const key in data){
       
       newFormError[key] = loginValidation(key, data[key]);
        if(newFormError[key]) valid=false;
    }
    setFormError(newFormError);
    if(valid){
setLoading(true);
      loginUser(data).then((res)=>{
       
        successNotification("Login Successful", "Redirecting to home Page...")
        dispatch(setJwt(res.jwt))
        // const decoded = jwtDecode(res.jwt);
        const decoded = safeDecodeJwt(res.jwt);
        if(decoded){

          dispatch(setUser({...decoded, email:decoded.sub}));
        }
        setTimeout(()=>{
          setLoading(false);
                // dispatch(setUser(res));
                 navigate("/");
        },4000)
      }).catch((err) => {
            setLoading(false);
            console.log(err)
            errorNotification("Login Failed","Something went wrong. Please try again.");
        });
    }
      }
  return (
    <>
    <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
        />
      <div className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Login into your account</div>

        <TextInput value={data.email} onChange={handleChange} name="email"  error={formError.email}
          withAsterisk
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
        />
        <PasswordInput value={data.password} onChange={handleChange} name="password" error={formError.password}
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
        />
       
        <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">
          Login
        </Button>
        <div className="sm-mx:text-sm xs-mx-text-xs text-center">
          Don't have an account? <span onClick={()=> {navigate("/signup"); setFormError(form); setData(form)}} className="text-bright-sun-400 hover:underline cursor-pointer">
            Signup
          </span>
        </div>
        <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center sm-mx:text-sm xs-mx-text-xs">Forget Password</div>
      </div>
      <ResetPassword opened={opened} close={close}/>
    </>
  );
};

export default Login;
