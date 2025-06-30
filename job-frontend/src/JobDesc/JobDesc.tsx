import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card} from "../Data/JobDescData";
import DOMPurify from 'dompurify'
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { companyData } from "../Data/Company";

const JobDesc = (props:any) => {
  const dispatch = useDispatch();
  const [applied,setApplied]= useState(false);
    const data =DOMPurify.sanitize(props.description);
    const profile = useSelector((state:any)=>state.profile);
    const user = useSelector((state:any)=>state.user);

    const handleSaveJob=()=>{
        // let savedJobs:any = [...profile.savedJobs];
        let savedJobs: any = Array.isArray(profile.savedJobs) ? [...profile.savedJobs] : [];
        if(savedJobs?.includes(props.id)){
            savedJobs=savedJobs?.filter((id:any)=>id!==props.id);
        }else{
          savedJobs = [...savedJobs, props.id];
        }
        let updatedProfile = {...profile, savedJobs:savedJobs};
        dispatch(changeProfile(updatedProfile));
      }
      useEffect(()=>{
        if(props.applicants?.filter((applicant:any)=> applicant.applicantId==user.id).length>0){
          setApplied(true)
        }
        else{
          setApplied(false);
        }
      },[props]);

      const handleClose=()=>{
        postJob({...props, jobStatus:"CLOSED"}).then((res)=>{
          // successNotification("Success","Job Closed Successfully");
          window.location.reload();
        }).catch((err)=>{
          errorNotification("Error",err.response.data.errorMessage);
        })
      }

      const companyInfo = companyData.find((comp)=>comp.Name.toLowerCase() === props.company?.toLowerCase());
  return (
    <>
      <div className="w-2/3 bs-mx:w-full">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex gap-2 items-center ">
            <div className="p-3 bg-mine-shaft-800 rounded-xl shrink-0 flex">
             
              <img
  className="h-14 xs-mx:h-10 xs-mx-w:10"
  src={`/Icons/${props.company}.png`}
  alt={`${props.company} Logo`}
  onError={(e) => {
    (e.target as HTMLImageElement).src = "/Icons/notfound.png";
  }}
/>

            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-2xl xs-mx:text-xl">{props.jobTitle}</div>
              <div className="text-lg text-mine-shaft-300 flex flex-wrap xs-mx:text-base">
               <span> {props.company} &bull;</span><span> {timeAgo(props.postTime)} &bull;</span><span> {props.applicants?props.applicants.length:0} Applicant
              </span></div>
            </div>
          </div>
          <div className="flex sm:flex-col gap-2 items-center sm-mx:my-5 ms-mx:[&>button]:w-1/2 sm-mx:w-full">
            {(props.edit || !applied) && <Link to={props.edit?`/post-jobs/${props.id}`:`/apply-job/${props.id}`}>
              <Button color="bright-sun.4" variant="light" size="sm">
                {props.closed?"Reopen":props.edit?"Edit":"Apply"}
              </Button>
            </Link>}
            {
               !props.edit && applied && <Button color="green.8" variant="light" size="sm">
                Applied
              </Button>
            }
            {props.edit && !props.closed?<Button color="red.5" variant="outline" size="sm" onClick={handleClose}>
                Close
              </Button>:profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer text-bright-sun-400" />:<IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />}
          </div>
        </div>
        <Divider my="xl" />
        <div className="flex justify-between gap-4 sm-mx:flex-wrap">
            {
                card.map((item:any,index:any)=>  <div key={index} className="flex flex-col items-center gap-1"> 
            <ActionIcon
              color="bright-sun.4"
              className="!h-12 !w-12 xs-mx:h-8 xs-mx:w-8"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className=" text-mine-shaft-300 xs-mx:text-sm">{item.name}</div>
            <div className="text-base font-semibold xs-mx:text-sm">{props?props[item.id]:"NA"} {item.id=="packageOffered" && <>LPA</>}</div>
          </div>)
            }
         
        </div>
        <Divider my="xl" />
        <div>
            <div className="text-xl font-semibold mb-5">Required SKills</div>
            <div className="flex flex-wrap gap-2">
                {
                    props?.skillsRequired?.map((item:any,index:number)=> <ActionIcon key={index}
              color="bright-sun.4"
              className="!h-fit !w-fit font-medium !text-sm xs-mx:!text-xs"
              variant="light"
              radius="xl"
              aria-label="Settings" p="xs"
            >{item}
            </ActionIcon>)
                }
                
            </div>
        </div>
        <Divider my="xl" />

        <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_p]:text-xs [&_li]:text-sm" dangerouslySetInnerHTML={{__html:data}}>

        </div>
        <Divider my="xl" />
        <div>
            <div className="text-xl font-semibold mb-5">About Company</div>

            <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
          <div className="flex gap-2 items-center ">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">{props.company}</div>
              <div className=" text-mine-shaft-300">
               10k + Employees
              </div>
            </div>
          </div>
            <Link to={`/company/${props.company}`}>
              <Button color="bright-sun.4" variant="light" >
                Company Page
              </Button>
            </Link>
          </div>
          <div className="text-mine-shaft-300 text-justify text-justify xs-mx:text-sm">{companyInfo?.Overview || `Welcome to ${companyInfo?.Name} `}</div>
        </div>
        </div>
    </>
  );
};

export default JobDesc;
