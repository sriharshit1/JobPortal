
import { Link, useNavigate, useParams } from "react-router-dom";
import PostJob from "../PostJob/PostJob";
import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import ApplyJobCompany from "../ApplyJob/ApplyJobCompany";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";



const ApplyJobPost=()=>{
  const navigate = useNavigate();
  const{id}=useParams();
  const [job,setJob] = useState<any>(null);
  
    useEffect(()=>{
      window.scrollTo(0,0);
      getJob(id).then((res)=>{
        setJob(res);
      }).catch((err)=>{
        console.log(err);
      })
    },[id])

    return(
        <>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
          <Divider size="xs"/>
            <Button mb="xs" onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" variant="light" >
              Back
            </Button>

          <ApplyJobCompany {...job}/>
        </div>
        </>
    )
}

export default ApplyJobPost;