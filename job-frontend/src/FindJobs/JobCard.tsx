import { Button, Divider, Text } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconClock } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const JobCard = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state:any)=>state.profile);

  const handleSaveJob=()=>{
    // let savedJobs:any = [...profile.savedJobs];
    let savedJobs: any = Array.isArray(profile.savedJobs) ? [...profile.savedJobs] : [];
    if(savedJobs?.includes(props.id)){
        savedJobs=savedJobs?.filter((id:any)=>id!==props.id);
    }else{
      savedJobs = [...savedJobs, props.id];
    }
    const updatedProfile = {...profile, savedJobs:savedJobs};
    dispatch(changeProfile(updatedProfile));
  }
  return (
    <>
      {/* <div className=" bg-mine-shaft-900 p-5 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400"> */}
     <div className="bg-mine-shaft-900 p-5 w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center ">
            <div className="p-2 bg-mine-shaft-800 rounded-md">
              <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div>
              <div className="font-semibold">{props.jobTitle}</div>
              <div className="text-xs text-mine-shaft-300">
                {props.company} &#x2022; {props.applicants?props.applicants.length:0} Applicant
              </div>
            </div>
          </div>
          {profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer text-bright-sun-400" />:<IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />}
        </div>
        <div className=" flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs ">
          <div>{props.experience}</div>
          <div>{props.jobType}</div>
          <div>{props.location}</div>
        </div>
        <Text
          className="!text-xs text-justify !text-mine-shaft-300"
          lineClamp={3}
        >
          {props.about}
        </Text>
        <Divider size="xs" color="mine-shaft.7" />
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">
            &#8377;{props.packageOffered} LPA
          </div>
          <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
            <IconClock className="h-5 w-5" />Posted {timeAgo(props.postTime)}
          </div>
        </div>
        <Link to={`/jobs/${props.id}`}>
        <Button color="bright-sun.4" variant="light" fullWidth >
                                 View Job
                               </Button>
        </Link>
      </div>
    </>
  );
};

export default JobCard;
