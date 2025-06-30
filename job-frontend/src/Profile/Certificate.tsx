import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const Certificate =()=>{

    const[addCerti,setAddCerti]= useState(false);
    const [edit, setEdit] = useState(false);    
    const profile=useSelector((state:any)=> state.profile);
    const matches = useMediaQuery('(max-width:475px');

    const handleClick=()=>{
        setEdit(!edit);
    }
    
    return(
        <>
        <div className="px-3">
          <div className="text-2xl font-semibold mb-5 flex justify-between">
            Certifications<div className="flex gap-2"><ActionIcon
              onClick={() => setAddCerti(true)}
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
              {edit?
                <IconX className="h-4/5 w-4/5" />:<IconPencil className="h-4/5 w-4/5" />
              }
            </ActionIcon>
          </div>
          </div>

          <div className="flex flex-col gap-8">
            {profile?.certifications?.map((certi: any, index: number) => (
              <CertiCard key={index} edit={edit} {...certi} index={index} />
            ))}
            {
             addCerti && <CertiInput setEdit={setAddCerti}/>
            }
          </div>
        </div>
        </>
    )
}

export default Certificate;