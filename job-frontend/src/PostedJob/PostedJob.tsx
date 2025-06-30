import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";

const PostedJob=(props:any)=>{
  const [activeTab,setActiveTab]=useState<string | null>('ACTIVE');
  useEffect(()=>{
    setActiveTab(props.job?.jobStatus || 'ACTIVE');
  },[props.job]);

return(
    <>
    <div className="w-1/6 mt-1/6">
        <div className="text-2xl font-semibold mb-5">Jobs</div>
        <div>
            <Tabs value={activeTab} onChange={setActiveTab} autoContrast variant="pills">
      <Tabs.List className="[&_button[aria-selected ='false']]:bg-mine-shaft-900 font-medium">
        <Tabs.Tab value="ACTIVE">Active [{props.jobList?.filter((job:any)=>job?.jobStatus==='ACTIVE').length}]</Tabs.Tab>
        <Tabs.Tab value="DRAFT">Draft [{props.jobList?.filter((job:any)=>job?.jobStatus==='DRAFT').length}]</Tabs.Tab>
        <Tabs.Tab value="CLOSED">Closed [{props.jobList?.filter((job:any)=>job?.jobStatus==='CLOSED').length}]</Tabs.Tab>
      </Tabs.List>
      </Tabs>
</div>
      
        <div className="flex flex-col gap-5 mt-5">
            {
                props.jobList?.filter((job:any)=>job?.jobStatus==activeTab).map((item:any,index:any)=><PostedJobCard key={index} {...item} />)
            }
        </div>
    </div>
    </>
)
}

export default PostedJob;