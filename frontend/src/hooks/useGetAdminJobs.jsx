import { setAllAdminJobs } from "../redux/jobSlice";
import { Job_API_ENDPOINT } from "../utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAdminJobs() {
  const dispatch = useDispatch();
  const fetchAllAdminJobs = async () => {
    try {
      const res = await axios.get(`${Job_API_ENDPOINT}/getadminjobs`, {
        withCredentials: true,
      });
           if (res.data.success) {
        dispatch(setAllAdminJobs(res.data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllAdminJobs();
  }, [dispatch]);
}

export default useGetAdminJobs;
