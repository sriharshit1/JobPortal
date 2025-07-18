import { Button, Divider, Drawer } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobPage=()=>{
  const navigate = useNavigate();
  const {id} =useParams();
   const user = useSelector((state:any)=>state.user);
   const [jobList,setJobList] = useState<any[]>([]);
   const [job,setJob] = useState<any>([]);
   const [opened, { open, close }] = useDisclosure(false);
  //  const matches = useMediaQuery('(max-width: 767px)');
   const matches = useMediaQuery('(max-width: 960px)');
   useEffect(()=>{
      window.scrollTo(0,0);
      if (!user) return;
      getJobPostedBy(user.id).then((res)=>{
        setJobList(res);

        if(res && res.length>0 && Number(id)==0)navigate(`/posted-job/${res[0].id}`)
        // setJob(res.find((item:any)=>item.id==id));
      const foundJob = res.find((item: any) => item.id.toString() === id);
      if (foundJob) {
        setJob(foundJob);
      } else {
        setJob(null); // Or fallback logic
      }
      }).catch((err)=>{
        console.log(err);
      })
   },[id]);

   const refreshJobList = () => {
  getJobPostedBy(user.id)
    .then((res) => {
      setJobList(res);
      if (res && res.length > 0) {
        const foundJob = res.find((item: any) => item.id.toString() === id);
        if (foundJob) {
          setJob(foundJob);
        } else {
          navigate(`/posted-job/${res[0].id}`);
        }
      } else {
        setJob(null);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

    return(
        <>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-5">
          <Divider size="xs"/>
          {matches&&<Button my="xs" size="sm" autoContrast  variant="default" onClick={open}>
        All jobs
      </Button>}
           <Drawer opened={opened} size={230} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} onClose={close} title="All Jobs">
         <PostedJob job={job} jobList={jobList}/>
      </Drawer>
    
          {/* <div className="flex w-full gap-5 px-5 justify-around"> */}
          <div className="flex gap-5 ">
           { !matches&&<PostedJob job={job} jobList={jobList}/>}
            <PostedJobDesc {...job} onJobDeleted={refreshJobList}/>
          </div>
        </div>
        </>
    )
}

export default PostedJobPage;

