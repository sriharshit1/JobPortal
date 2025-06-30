import { Avatar, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { companyData } from "../Data/Company";

const Company = () => {
  const {companyName} = useParams();
  const [company,setCompany] = useState<any>(null);

  useEffect(()=>{
    if(companyName){
      const data = companyData.find(
        (comp)=> comp.Name.toLowerCase() === companyName.toLowerCase()
      );
      setCompany(data);
    }
  },[companyName]);

   if (!company) {
    return <div className="text-2xl text-mine-shaft-300">Unable to Load company Page...</div>;
  }
  return (
    <>
      <div className="w-3/4">
        <div className="relative">
          <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
         <img
  className="w-36 h-436 rounded-3xl bg-mine-shaft-950 -bottom-1/4 absolute left-5 p-2 border-8 border-mine-shaft-950"
  src={`/Icons/${company.Name}.png`}
  alt={`${company.Name} Logo`}
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = "/Icons/notfound.png";
  }}
/>

        </div>
        <div className="px-3 mt-12">
          <div className="text-3xl font-semibold flex justify-between">
            {company.Name}
            <Avatar.Group>
              <Avatar src="avatar.png" />
              <Avatar src="avatar1.png" />
              <Avatar src="avatar2.png" />
              <Avatar>+10k</Avatar>
            </Avatar.Group>
          </div>
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {company.Industry}
          </div>
          <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
            <IconMapPin className="h-5 w-5" />
           {company.Headquarters}
          </div>
          <Divider my="xl" />
          <div>
            <Tabs variant="outline" radius="lg" defaultValue="about">
              <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']:text-bright-sun-400] mb-5">
                <Tabs.Tab value="about">About</Tabs.Tab>
                <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                <Tabs.Tab value="employees">Employees</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="about"><AboutComp overview={company.Overview}
    specialties={company.Specialties}
    industry={company.Industry}
    website={company.Website}
    size={company.Size}
    headquarters={company.Headquarters} /></Tabs.Panel>
              <Tabs.Panel value="jobs"><CompanyJobs companyName={company.Name}/></Tabs.Panel>
              <Tabs.Panel value="employees"><CompanyEmployees companyName={company.Name}/></Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
