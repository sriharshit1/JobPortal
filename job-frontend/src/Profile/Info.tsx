import { useState } from "react"
import fields from "../Data/Profile"
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconBriefcase, IconBriefcase2, IconCheck, IconDeviceFloppy, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { Navigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const Info =()=>{

    const select = fields;
    const dispatch = useDispatch();
    const user = useSelector((state:any)=> state.user)
    const profile  = useSelector((state:any)=> state.profile);
     const [edit, setEdit] = useState(false);
      const matches = useMediaQuery('(max-width:475px')

     const handleClick=()=>{
        if(!edit){
        setEdit(true);
        form.setValues({jobTitle:profile.jobTitle , company:profile.company , location:profile.location , totalExp:profile.totalExp});
    }
    else{
        setEdit(false);
        
    }
     };

     const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '' ,location: '',totalExp:1}
  });

  if (!user) {
  return <Navigate to="/" />;
}
const handleSave=()=>{
   setEdit(false);
        const updatedProfile = {...profile , ...form.getValues()}
        dispatch(changeProfile(updatedProfile));
        successNotification("Success","Profile Updated Successfully");
}
    return(
        <>
         <div className="text-3xl font-semibold flex justify-between xs-mx:text-2xl ">
            {user.name}
            <div>
              {edit&&<ActionIcon
              onClick={handleSave}
              color="green.8"
              size={matches?"md":"lg"}
              variant="subtle"
            >
                <IconCheck className="h-4/5 w-4/5" stroke={1.5}/>
            </ActionIcon>}
            <ActionIcon
              onClick={handleClick}
              color={edit?"red.8":"bright-sun.4"}
              size={matches?"md":"lg"}
              variant="subtle"
            > 
              {edit ? (
                <IconX className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
            </div>
          </div>
          {edit ? (
            <>
              
              <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
                <SelectInput form={form} name="jobTitle" {...select[0]} />
                <SelectInput form ={form} name="company" {...select[1]} />
              </div>
              <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
              <SelectInput form={form} name="location" {...select[2]} />
              <NumberInput label="Experience" {...form.getInputProps('totalExp')} hideControls clampBehavior="strict" min={1} max={50} withAsterisk/>
              </div>
            </>
          ) : (
        <>
        <div className="text-xl flex gap-1 items-center xs-mx:text-base"><IconBriefcase className="h-5 w-5" stroke={1.5}/>{profile.jobTitle} &bull; {profile.company}</div>
              <div className="flex gap-1 text-lg text-mine-shaft-300 items-center xs-mx:text-base">
                <IconMapPin className="h-5 w-5" /> {profile.location}
              </div>
              <div className="flex gap-1 text-lg text-mine-shaft-300 items-center xs-mx:text-base">
                <IconBriefcase2 className="h-5 w-5" />Experience: {profile.totalExp} Years
              </div>
        </>
          )}
      
        
        </>
    )
}
export default Info ;