import { Tabs } from "@mantine/core";
import { jobList } from "../Data/JobsData";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((res) => {
        setJobList(res);
        // setShowList(res.filter((job:any)=>{
        const appliedJobs = res.filter((job: any) => {
          let found = false;
          job.applicants?.forEach((applicant: any) => {
            if (
              applicant.applicantId == user.id &&
              applicant.applicationStatus == "APPLIED"
            ) {
              found = true;
            }
          });
          return found;
        });
        setShowList(appliedJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    if (value == "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile.savedJobs?.includes(job.id))
      );
    } else {
      setShowList(
        jobList.filter((job: any) => {
          let found = false;
          job.applicants?.forEach((applicant: any) => {
            if (
              applicant.applicantId == user.id &&
              applicant.applicationStatus == value
            ) {
              found = true;
            }
          });
          return found;
        })
      );
    }
  };
  return (
    <>
      <div>
        <div className="text-2xl font-semibold mb-5">Job History</div>
        <div>
          <Tabs
            variant="outline"
            radius="lg"
            value={activeTab}
            onChange={handleTabChange}
          >
            <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400 mb-5 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:font-medium xs-mx:[&_button]:!py-2">
              <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
              <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
              <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
              <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={activeTab}>
              {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-10">
                {
                showList.map((job:any, index:any) => 
                  <Card key={index} {...job} {...{[activeTab.toLowerCase()]:true}} /> )
                  }
              </div> */}
              <div className="mt-10 px-4 sm:px-10">
                {loading ? (
                  <div className="text-center text-gray-400 text-lg py-10 animate-pulse">
                    Loading jobs...
                  </div>
                ) : showList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {showList.map((job: any, index: any) => (
                      <Card
                        key={index}
                        {...job}
                        {...{ [activeTab.toLowerCase()]: true }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className=" text-center text-mine-shaft-300 text-2xl py-10 font-semibold">
                    No {activeTab.toLowerCase()} jobs yet.
                  </div>
                )}
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default JobHistory;
