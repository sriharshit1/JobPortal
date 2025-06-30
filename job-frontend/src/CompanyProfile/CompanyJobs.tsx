import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs=({companyName} : {companyName:string})=>{
    return (
        <>
         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 px-4 ">

            {
                jobList.map((job,index)=><JobCard key={index}{...job}/>)
            }
            </div>
        </>
    )
}

export default CompanyJobs;