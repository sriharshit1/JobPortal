import { useEffect, useState } from "react";
import { jobList } from "../Data/JobsData";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../Services/ProfileService";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([{}]);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const [loading, setLoading] = useState(true);

  const [filterJobs, setFilterJobs] = useState<any>([]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    // setLoading(true);
    // getAllProfiles()
    //   .then((res) => {
    //     setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //   });
  }, []);

  useEffect(() => {
    if (sort == "Most Recent") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) =>
            new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
        )
      );
    } else if (sort == "Salary: Low to High") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) => a.packageOffered - b.packageOffered
        )
      );
    } else if (sort == "Salary: High to Low") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) => b.packageOffered - a.packageOffered
        )
      );
    }
  }, [sort]);

  useEffect(() => {
    let filtered = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtered = filtered.filter((job: any) =>
        filter["Job Title"]?.some((x: any) =>
          job?.jobTitle?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }
    if (filter.Location && filter.Location.length > 0) {
      filtered = filtered.filter((job: any) =>
        filter.Location?.some((x: any) =>
          job?.location?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }
    if (filter.Experience && filter.Experience.length > 0) {
      filtered = filtered.filter((job: any) =>
        filter.Experience?.some((x: any) =>
          job?.experience?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }
    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filtered = filtered.filter((job: any) =>
        filter["Job Type"]?.some((x: any) =>
          job?.jobType?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }
    if (filter.salary && filter.salary.length > 0) {
      filtered = filtered.filter(
        (jobs: any) =>
          filter.salary[0] <= jobs.packageOffered &&
          jobs?.packageOffered <= filter.salary[1]
      );
    }
    setFilterJobs(filtered);
  }, [filter, jobList]);

  return (
    <>
      <div className="p-5">
        {/* <div className="flex justify-between mt-5"> */}
        <div className="flex justify-between mt-5 max-w-7xl mx-auto flex-wrap">
          <div className="text-2xl xs-mx:text-xl font-semibold">
            Recommended Jobs
          </div>
          <Sort sort="job" />
        </div>
        {/* <div className="mt-10 flex flex-wrap gap-5"> */}
        {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-10">

            {
                filterJobs.map((job:any,index:any)=><JobCard key={index}{...job}/>)
            }
            </div> */}

        <div className="mt-10 px-4 sm:px-10">
          {loading ? (
            <div className="text-center text-gray-400 text-lg py-10 animate-pulse">
              Loading jobs...
            </div>
          ) : filterJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterJobs.map((job: any, index: any) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-lg py-10">
              No job posted yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
