import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";


const Profile = (props: any) => {
const dispatch = useDispatch();
const profile = useSelector((state:any)=>state.profile);
const {hovered,ref} = useHover();

  const handleFileChange=async(image:any)=>{
    let picture:any = await getBase64(image);
    let updatedProfile={...profile,picture:picture.split(',')[1]};
    dispatch(changeProfile(updatedProfile));
      successNotification("Success", "Profile Updated Successfully");
  };
  return (
    <>
      <div className="w-4/5 mx-auto pb-24 lg-mx:w-full">
        <div className="relative px-5">
          <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="" />
          <div ref={ref} className="absolute -bottom-1/3 left-6 flex items-center justify-center cursor-pointer !rounded-full md-mx:-bottom-10 sm-mx:-bottom-16">
          <Avatar
            className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 rounded-full border-8 border-mine-shaft-950 sm-mx:!h-36 xs-mx:!h-32 xs-mx:!w-32"
            src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png"}
            alt="Image"
          />
          {hovered&& <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
          {hovered&& <IconEdit className="absolute z-[300] !w-16 !h-16"/>}

          {hovered&& <FileInput onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full" variant="transparent" accept="image/png,image/jpeg"

    />}
          </div>
        </div>
        <div className="px-3 mt-[6rem]">
          <Info/>
        </div>
        <Divider mx="xs" size="xs" my="xl" />
        <About/>
        <Divider mx="xs" my="xl" />
        <Skills/>
        <Divider mx="xs" my="xl" />
       <Experience/>
        <Divider mx="xs" my="xl" />
        <Certificate/>
      </div>
    </>
  );
};

export default Profile;
