import { Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconBriefcase2, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Profile = (props:any) => {
  const {id} = useParams();
  const [profile,setProfile] = useState<any>();
  const matches = useMediaQuery('(max-width: 475px)')
  useEffect(()=>{
    window.scrollTo(0,0);
    getProfile(id).then((res)=>{
      setProfile(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[id])



  return (
    <>
      <div className="w-2/3 lg-mx:w-full">
        <div className="relative">
          <img className="rounded-t-2xl xs-mx:h-32 xl-mx:h-40 w-full" src="/Profile/banner.jpg" alt="" />
          <div
            className=" !rounded-full -bottom-1/3 absolute left-3  cursor-pointer flex items-center justify-center md-mx:-bottom-10 sm-mx:-bottom-16 left-6">
              <Avatar className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 border-8 border-mine-shaft-950 rounded-full sm-mx:!h-36 xs-mx:!h-32 xs-mx:!w-32"  src={profile?.picture?`data:image/jpeg;base64,${profile?.picture}`:"/avatar.png"}/>
          </div>
        </div>
        <div className="px-3 mt-16">
          <div className="text-3xl font-semibold flex justify-between xs-mx:text-2xl">
            {profile?.name}
            <Button size ={matches?"sm":"md"} color="bright-sun.4" variant="light">
              Message
            </Button>
          </div>
          <div className="text-xl flex gap-1 items-center xs-mx:text-base">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />{profile?.jobTitle} &bull;
            {profile?.company}
          </div>
          <div className="flex gap-1 text-lg text-mine-shaft-300 items-center xs-mx:text-base">
            <IconMapPin className="h-5 w-5" /> {profile?.location}
          </div>
          <div className="flex gap-1 text-lg text-mine-shaft-300 items-center xs-mx:text-base">
            <IconBriefcase2 className="h-5 w-5" />Experience: {profile?.totalExp} Years
          </div>
        </div>
        <Divider mx="xs" size="xs" my="xl" />
        <div className="px-3">
          <div className="text-2xl font-semibold mb-3">About</div>
          <div className="text-sm text-mine-shaft-300 text-justify">
           {profile?.about}
          </div>
        </div>
        <Divider mx="xs" my="xl" />

        <div className="px-3">
          <div className="text-2xl font-semibold mb-3">Skills</div>
          <div className="flex flex-wrap gap-2">
            {
                profile?.skills?.map((skill:any,index:any)=> <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
              {skill}
            </div>)
            }
           
          </div>
        </div>
        <Divider mx="xs" my="xl" />
        <div className="px-3">
          <div className="text-2xl font-semibold mb-5">Experience</div>
          <div className="flex flex-col gap-8">
          {
            profile?.experiences?.map((exp:any,index:any)=> <ExpCard key={index}{...exp}/>)
          }
          </div>
          
        </div>
        <Divider mx="xs" my="xl" />
        <div className="px-3">
          <div className="text-2xl font-semibold mb-5">Certifications</div>

           <div className="flex flex-col gap-8">
          {
            profile?.certifications?.map((certi:any,index:any)=> <CertiCard key={index}{...certi}/>)
          }
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Profile;
