
import axios from "axios";
import { setCompanies} from "../redux/companySlice";
import { Company_API_ENDPOINT } from "../utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`${Company_API_ENDPOINT}/get`,{
        withCredentials: true,
      });
     
      if (res.data.success) {
               dispatch(setCompanies(res.data.companies));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   
    fetchCompany();
  }, [dispatch]);
}

export default useGetAllCompanies;

