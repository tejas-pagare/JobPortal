import axios from "axios";
import { setSingleCompany } from "../redux/companySlice";
import { Company_API_ENDPOINT } from "../utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetCompanyById(id) {
  const dispatch = useDispatch();

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`${Company_API_ENDPOINT}/get/${id}`, {
        withCredentials: true,
      });
    
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, [id, dispatch]);
}

export default useGetCompanyById;
