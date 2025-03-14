import { setAllJobs } from '../redux/jobSlice';
import { Job_API_ENDPOINT } from '../utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllJobs() {
  const dispatch = useDispatch();
  const getAllJobs = async()=>{
    const res = await axios.get(`${Job_API_ENDPOINT}/get`,{withCredentials:true});
    if(res.data.success){
    
      dispatch(setAllJobs(res.data.jobs));
    }
  }
  useEffect(()=>{
    try {
      getAllJobs()
    } catch (error) {
      console.log(error);
    }
  },[])
  
}

export default useGetAllJobs
