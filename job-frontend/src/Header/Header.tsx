import { Avatar, Burger, Button, Drawer, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSettings, IconX } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { setUser } from "../Slices/UserSlice";
import { setupResponseInterpretor } from "../Intrceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";
import { safeDecodeJwt } from "../Slices/SafeDecodeJwt";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state:any)=>state.user);
  const token = useSelector((state:any)=>state.jwt);
  const dispatch = useDispatch();
  const navigate=useNavigate();
   const [opened, { open, close }] = useDisclosure(false);

   const links = [
        {name:"Find Jobs" ,url:"find-jobs"},
        {name:"Find Talent" ,url:"find-talent"},
        {name:"Post Job" ,url:"post-jobs/0"},
        {name:"Posted Job" ,url:"posted-job/0"},
        {name:"Job History" ,url:"job-history"},
    ]
  

  useEffect(()=>{
    setupResponseInterpretor(navigate);
      },[navigate]);

  useEffect(()=>{
    if(token!=""){
      if(localStorage.getItem("token") != ""){
      // const decoded = jwtDecode(localStorage.getItem("token")|| "");
      const decoded = safeDecodeJwt(token);
      if(decoded){

        dispatch(setUser({...decoded, email:decoded.sub}));
      }
              }
    }
if(user?.profileId)getProfile(user?.profileId).then((res)=>{
    dispatch(setProfile(res));
  }).catch((err)=>{
    console.log(err);
  })
  },[token,navigate]);

  return (
    <>
      {location.pathname !== "/signup" && location.pathname != "/login" &&(
        <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center font-['poppins']">
          <div className="flex gap-1 items-center text-bright-sun-400">
            <IconAnchor className="h-8 w-8" stroke={2.5} />
            <div className="xs-mx:hidden text-3xl font-semibold">HireX</div>
          </div>
          {NavLinks()}
          <div className="flex gap-3 items-center">
            {user?<ProfileMenu />:<Link to="/login" > 
            <Button variant="subtle" color="bright-sun.4">Login</Button>
            </Link>}
            {user?<NotiMenu/>:<></>}
            {

            }
            <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
             <Drawer size="xs" position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} opened={opened} onClose={close}  closeButtonProps={{
          icon: <IconX size={30}  />,
        }}>
          <div className="flex flex-col gap-5 items-center">

           {links.map((link,index)=><div key={index} className= "h-full flex items-center">
                          <Link className="hover:bright-sun-400 text-xl" to={link.url}>{link.name}</Link>
                      </div>)}
                      
          </div>
      </Drawer>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
