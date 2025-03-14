import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import useGetJob from "../hooks/useGetJob";
import axios from "axios";
import { Application_API_ENDPOINT, Job_API_ENDPOINT } from "../utils/constant";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useGetAllJobs from "../hooks/useGetAllJobs";
import Navbar from "./shared/Navbar";

function JobDescription() {
  
  const [job, setJob] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const [isApplied,setApplied] = useState(job?.applications?.some((e) => e === user?._id) || false);
  const fetchJob = async () => {
    const res = await axios.get(`${Job_API_ENDPOINT}/get/${id}`, {
      withCredentials: true,
    });
       if(res.data.success){
      setJob(res.data.job);
      setApplied(res.data.job?.applications?.some((e) => e.applicant === user?.id) || false)
      useGetAllJobs();

    }
    
  };
  useEffect(() => {
    try {
      fetchJob();
          
      
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const jobApplyHandler = async()=>{
    try {
      const res = await axios.get(`${Application_API_ENDPOINT}/apply/${job._id}`,{withCredentials:true});
          if(res.data.success){
        setApplied(true);
        fetchJob();
        toast.success(res.data.message);
      }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
  }

  if (!job) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Navbar/>
      <div className="m-12">
        <div className="max-w-5xl mx-auto">
          <div>
            <div className="flex flex-col items-start gap-4  sm:items-center justify-between">
              <div className="flex gap-4 flex-col">
                <h1 className="font-bold text-lg">{job.title}</h1>
                <div className="flex gap-3 items-center">
                  <Badge
                    variant={"outline"}
                    className={"text-blue-700 font-bold cursor-pointer"}
                  >
                    {job.positions} Position
                  </Badge>
                  <Badge
                    variant={"outline"}
                    className={"text-red-700 font-bold cursor-pointer"}
                  >
                    {job.jobType}
                  </Badge>
                  <Badge
                    variant={"outline"}
                    className={"text-purple-900 font-bold cursor-pointer"}
                  >
                    {job.salary}LPA
                  </Badge>
                </div>
              </div>
              <div>
                <Button
                  className={
                    isApplied
                      ? ""
                      : "bg-purple-800 hover:bg-purple-700 cursor-pointer"
                  }
                  disabled={isApplied}
                  onClick={jobApplyHandler}
                >
                  {isApplied ? "Already Applied" : "Apply now"}
                </Button>
              </div>
            </div>
            <div>
              <p className="border-b py-4 text-sm font-semibold">
                Job Description
              </p>
            </div>

            <div className="space-y-4 py-4">
              <h1 className="text-sm font-bold flex items-start">
                Role:
                <span className="text-gray-700 font-normal ml-4">
                  {job.title}
                </span>
              </h1>

              <h1 className="text-sm font-bold flex items-start">
                Location:
                <span className="text-gray-700 font-normal ml-4">
                  {job.location}
                </span>
              </h1>

              <h1 className="text-sm font-bold flex items-start">
                Description:
                <span className="text-gray-700 font-normal ml-4">
                  {job.description}
                </span>
              </h1>

              <h1 className="text-sm font-bold flex items-start">
                Experience:
                <span className="text-gray-700 font-normal ml-4">2yrs</span>
              </h1>

              <h1 className="text-sm font-bold flex items-start">
                Salary:
                <span className="text-gray-700 font-normal ml-4">
                  {job.salary}LPA
                </span>
              </h1>

              <h1 className="text-sm font-bold flex items-start">
                Total Applicants:
                <span className="text-gray-700 font-normal ml-4">{job.applications.length}</span>
              </h1>

              <h1 className="text-sm font-bold flex items-start">
                Posted Date:
                <span className="text-gray-700 font-normal ml-4">
                  {job.createdAt.split("T")[0]}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default JobDescription;
