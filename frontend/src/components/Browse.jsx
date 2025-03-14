import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "../Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchJobText } from "../redux/jobSlice";

function Browse() {
  const { Alljobs } = useSelector((store) => store.job);
  const [currentJobs, setCurrentJobs] = useState(Alljobs);
  const { searchJobText } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    
    const filterJobs = () => {
      const filteredJobs = Alljobs?.filter((job) =>
        job.title.toLowerCase().includes(searchJobText.toLowerCase())
      );
      setCurrentJobs(filteredJobs);
    };
    if (searchJobText.length>0) {
      filterJobs();
    }
    return ()=>{
      dispatch(setSearchJobText(""))
    }
  }, [searchJobText]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="px-10 py-6 font-bold text-xl">
          Search Jobs ({currentJobs.length})
        </h1>
        <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentJobs.map((e) => (
            <Job key={e._id} job={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
Browse;
