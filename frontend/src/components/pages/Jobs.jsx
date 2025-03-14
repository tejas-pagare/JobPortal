import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "../../FilterCard";
import Job from "../../Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function Jobs() {
  const jobs = [1, 2, 4, 5, 6, 7, 8, 9, 10];
  const { Alljobs, filterSearchText } = useSelector((store) => store.job);

  const [filteredJobs, setFilteredJobs] = useState(Alljobs);
  const filterJobs = (jobs, searchText) => {
    if (!Array.isArray(jobs)) {
      throw new Error("jobs must be an array.");
    }

    // Convert search text to lowercase for case-insensitive matching
    const search = searchText.toLowerCase();
  
    return jobs.filter((job) => {
           return (
        (job.title.toLowerCase()).includes(search) || 
        ( job.description.toLowerCase()).includes(search) ||// Match job title
        job.location.toLowerCase().includes(search) || // Match location
        job.salary.toString().includes(search.split("lakh")[0]) // Match salary
      );
    });
  };

  useEffect(() => {
    setFilteredJobs(filterJobs(Alljobs, filterSearchText));
  }, [filterSearchText]);
  return (
    <div className="mb-12 p-4">
      <Navbar />
      <div className="max-w-6xl mx-auto flex mt-5">
        <div className="w-[20%]">
          <FilterCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto">
          {jobs.length <= 0 && (
            <div className="text-center text-xl "> No Jobs Available</div>
          )}
          {filteredJobs.length >= 1 &&
            filteredJobs.map((job) => {
              return <motion.div 
              initial={{opacity:0,x:100}}
              animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-100}}
              transition={{duration:0.3}}
              key={job?._id}
              >
                <Job job={job} />;
              </motion.div> 
            })}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
