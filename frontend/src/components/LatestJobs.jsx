import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LatestJobs() {
  const navigate = useNavigate();
  const {Alljobs} = useSelector(store=>store.job);
if(!Alljobs)return <div>Loading...</div>
  return (
    <div className='w-full max-w-7xl mx-auto min-h-screen my-12'>
      <h1 className='text-3xl md:text-4xl font-bold px-8 py-8'>
        <span className='text-purple-800 '>Latest & Top </span> Job Opening
        </h1>
        <div className='grid grid-flow-cols-1 md:grid-cols-2 lg:grid-cols-3 px-12 gap-6'>
          {
          Alljobs?.length>0 && Alljobs?.map((job) =>{
              return <div onClick={()=>navigate(`/description/${job?._id}`)}>
                <LatestJobCard companyName={job?.company?.name} location={job.location} title={job?.title} desciption={job?.description}  positions={job?.positions} jobType={job?.jobType} salary={job?.salary} />

              </div>
            })
          }
          {
            Alljobs?.length<=0 && <div>No jobs Available</div>

          }
        </div>
    </div>
  )
}

export default LatestJobs
