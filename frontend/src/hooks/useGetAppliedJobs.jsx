

import { setAppliedJobs } from '../redux/jobSlice';
import { Application_API_ENDPOINT} from '../utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAppliedJobs() {
  const dispatch = useDispatch();
  const getAppliedJobs = async()=>{
  
    const res = await axios.get(`${Application_API_ENDPOINT}/get`,{withCredentials:true});
    if(res.data.success){
      
      dispatch(setAppliedJobs(res.data.applications));
    }
  }
  useEffect(()=>{
    try {
      getAppliedJobs()
    } catch (error) {
      console.log(error);
    }
  },[])
  
}

export default useGetAppliedJobs
