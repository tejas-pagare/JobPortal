import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Company_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const [companyName ,setCompanyName] =useState("");
  const dispatch = useDispatch();
  const companyRegisterHandler = async()=>{
    try {
      
      const res = await axios.post(`${Company_API_ENDPOINT}/register`,{companyName},{withCredentials:true});
      if(res?.data?.success){
        const id = res?.data?.company?._id;
        dispatch(setSingleCompany(res.data?.company));
        navigate(`/admin/companies/${id}`);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-8">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500 text-sm">
            What name would you like to give your company ? You may give it
            later
          </p>
        </div>
        <div className="flex gap-2 flex-col">
          <Label>Company Name</Label>
          <Input onChange={(e)=>setCompanyName(e.target.value)} value={companyName} type="text" placeHolder="JobHunt , Microsoft.." className="flex-1"/>
        </div>
        <div className="my-6 flex gap-3">
            <Button onClick={()=>navigate('/admin/companies')} variant="outline">Cancel</Button>
            <Button onClick={()=>companyRegisterHandler()}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
