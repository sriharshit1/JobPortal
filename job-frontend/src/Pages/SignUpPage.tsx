import { Button, Divider } from "@mantine/core";
import PostJob from "../PostJob/PostJob";
import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";


const SignUpPage=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    return(
        <>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden sm-mx:overflow-y-auto">
           <Button className="!absolute left-5 z-10" my="md" onClick={()=> navigate("/")} leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" variant="light" >
                         Home
                       </Button>
          <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname == '/signup'?'-translate-x-1/2 sm-mx:-translate-x-full':'translate-x-0'}`}>
            <Login/>
                <div className={`w-1/2 sm-mx:hidden sm-mx:min-h-full h-full transition-all duration-1000 ease-in-out ${location.pathname == "/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex items-center justify-center flex-col gap-5 `}>
                 <div className="flex gap-1 items-center text-bright-sun-400">
            <IconAnchor className="h-16 w-16" stroke={2.5} />
            <div className="text-6xl font-semibold bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl ">JobHook</div>
          </div>
          <div className="text-2xl bs-mx:text-xl md-mx:text-lg text-mine-shaft-200 font-semibold">Find the job made for you </div>
                </div>
          <SignUp/>
          </div>
        </div>
        </>
    )
}

export default SignUpPage;