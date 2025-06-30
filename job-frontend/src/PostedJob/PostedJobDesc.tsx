import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc=(props:any)=>{
  const [tab,setTab] = useState("overview");
  const [arr,setArr]=useState<any>([]);
  const handleTabChange=(value:any)=>{
    setTab(value);
    if(value=="applicants"){
      setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="APPLIED"));
    }
    else if(value=="invited"){
      setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="INTERVIEWING"))
    }
    else if(value == "offered"){
      setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="OFFERED"));
    }
    else if(value=="rejected"){
      setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="REJECTED"));
    }
  }

  useEffect(()=>{
    handleTabChange("overview");
  },[props]);
return(
    <>
    <div className="mt-5 w-3/4 ms-mx:w-full px-5 md-mx:p-0">
        {props.jobTitle?<><div className="text-2xl xs-mx:text-xl font-semibold flex items-center">{props.jobTitle} <Badge variant="light" ml="sm" size="sm" color="bright-sun.4">{props.jobStatus}</Badge></div>
        <div className="font-medium text-mine-shaft-300 xs-mx:text-sm mb-5">{props.location}</div>
        <div>
            <Tabs variant="outline" radius="lg" value={tab} autoContrast onChange={handleTabChange}>
                          <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:font-medium xs-mx:[&_button]:!py-2">
                            <Tabs.Tab value="overview">Overview</Tabs.Tab>
                            <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                            <Tabs.Tab value="invited">Invited</Tabs.Tab>
                            <Tabs.Tab value="offered">Offered</Tabs.Tab>
                            <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                          </Tabs.List>
            
                          <Tabs.Panel className="[&>div]:w-full" value="overview"><JobDesc {...props} edit={true} closed={props.jobStatus=="CLOSED"}/>
                          </Tabs.Panel>
                          <Tabs.Panel value="applicants">
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  gap-5 px-4">
                            {
                                 arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} posted={true}/>):<div className="text-2xl font-semibold">No Applicant</div>
                            }
                            </div>
                          </Tabs.Panel>
                          <Tabs.Panel value="invited">
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  gap-5 px-4">
                            {
                                 arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} invited={true}/>):<div className="text-2xl font-semibold">No Invited Candidates</div>
                            }
                            </div>
                          </Tabs.Panel>
                           <Tabs.Panel value="offered">
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  gap-5 px-4 ">
                            {
                                 arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} offered/>):<div className="text-2xl font-semibold">No Offered Candidates</div>
                            }
                            </div>
                          </Tabs.Panel>
                           <Tabs.Panel value="rejected">
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  gap-5 px-4">
                            {
                                 arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} rejected/>):<div className="text-2xl font-semibold">No Rejected Candidates</div>
                            }
                            </div>
                          </Tabs.Panel>
                        </Tabs>
        </div>
</>:<div className="text-2xl font-semibold flex min-h-[70vh] justify-center items-center">No Job Selected</div>}
    </div>
    </>
)
}

export default PostedJobDesc;