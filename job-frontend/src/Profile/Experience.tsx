import { ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import ExpCard from "./ExpCard";
import { useSelector } from "react-redux";
import ExpInput from "./ExpInput";
import { useMediaQuery } from "@mantine/hooks";

const Experience=()=>{
    const profile = useSelector((state:any)=> state.profile)
    const [edit,setEdit] = useState(false);
    const [addExp,setAddExp] = useState(false);
     const matches = useMediaQuery('(max-width:475px')
    const handleClick=()=>{
        setEdit(!edit);
    }
    return(
        <>
         <div className="px-3">
                  <div className="text-2xl font-semibold mb-5 flex justify-between">
                    Experience{" "} <div className="flex gap-2"><ActionIcon
                      onClick={() => setAddExp(true)}
                      color="bright-sun.4"
                       size={matches?"md":"lg"}
                      variant="subtle"
                    >
                        <IconPlus className="h-4/5 w-4/5" />
                    </ActionIcon>
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
                  <div className="flex flex-col gap-8">
                    {profile?.experiences?.map((exp: any, index: number) => <ExpCard key={index} {...exp} edit ={edit} index={index}/>
                    )}
                   {addExp && <ExpInput add setEdit={setAddExp}/>}
                  </div>
                </div>
        </>
    )
}

export default Experience;