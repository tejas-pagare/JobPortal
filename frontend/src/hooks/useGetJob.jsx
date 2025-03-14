import { Job_API_ENDPOINT } from '../utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'

function useGetJob({id}) {
  let job = {};
  console.log(job)
  const getJob = async()=>{
    const res = await axios.get(`${Job_API_ENDPOINT}/get/${id}`,{withCredentials:true});
    if(res.data.success){
      job = res.data.job;
    }
  }
useEffect(()=>{
  try {
    getJob();
  } catch (error) {
  
  }
},[])
return job;
}

export default useGetJob
