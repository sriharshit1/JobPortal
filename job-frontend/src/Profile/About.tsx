import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const About=()=>{
     const dispatch = useDispatch();
     const [edit, setEdit] = useState(false);
     const profile = useSelector((state:any)=> state.profile);
     const [about,setAbout] = useState("")
      const matches = useMediaQuery('(max-width:475px')
       const handleClick=()=>{
        if(!edit){
        setEdit(true);
       setAbout(profile.about);
    }
    else{
        setEdit(false);
        
    }
     };

     const handleSave=()=>{
          setEdit(false);
                let updatedProfile = {...profile , about:about}
                dispatch(changeProfile(updatedProfile));
                successNotification("Success","About Updated Successfully");
     }
    return(
        <>
        <div className="px-3">
                  <div className="text-2xl font-semibold mb-3 flex justify-between">
                    About
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
                  {
                    edit?<Textarea
                  autosize
                  minRows={3} placeholder="Enter about yourself"
                    value={about}
                    onChange={(event) => setAbout(event.currentTarget.value)}
                  />:<div className="text-sm text-mine-shaft-300 text-justify">
                    {profile?.about}
                  </div>
                  }
                  
                  
                </div>
        </>
    )
}

export default About;