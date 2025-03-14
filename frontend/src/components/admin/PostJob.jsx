import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { Job_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    salary: "",
    requirements: "",
    experienceLevel: "",
    location: "",
    positions: "",
    companyId: "",
    jobType: "",
  });
  
  const setCompanyHandler = (value) => {
    const selectedCompany = companies.find(
      (e) => e.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const onHandleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${Job_API_ENDPOINT}/post`,input,{withCredentials:true});
      if(res.data.success){
        navigate("/admin/jobs");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false)
    }
   
  }
  return (
    <div>
      <Navbar />
      <div onSubmit={onSubmitHandler} className="flex items-center justify-center">
        <form className="flex flex-col border-gray-200 p-4 border shadow-sm rounded-lg ">
          <div className="min-w-96 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                value={input.title}
                onChange={onHandleChange}
                name="title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={input.description}
                onChange={onHandleChange}
                name="description"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                value={input.salary}
                onChange={onHandleChange}
                name="salary"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                value={input.requirements}
                onChange={onHandleChange}
                name="requirements"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                value={input.experienceLevel}
                onChange={onHandleChange}
                name="experienceLevel"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                value={input.location}
                onChange={onHandleChange}
                name="location"
              />
            </div>
            <div>
              <Label>Positions</Label>
              <Input
                type="number"
                value={input.positions}
                onChange={onHandleChange}
                name="positions"
              />
            </div>
            
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                value={input.jobType}
                onChange={onHandleChange}
                name="jobType"
              />
            </div>
            <div>
              <Label>Select Company</Label>
              <Select onValueChange={setCompanyHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Companies</SelectLabel>
                    {companies.map((cam) => (
                      <SelectItem value={cam?.name?.toLowerCase()}>
                        {cam.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {loading && (
            <Button disabled={true} className="mt-6" type="submit">
              <Loader2 className="h-2 w-2 mr-4 animate-spin" /> please wait
            </Button>
          )}
          {!loading && (
            <Button className="mt-6" type="submit">
              Post Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-red-700 font-bold mt-2 text-center text-sm">
              *Please register a company first, before positing a job*
            </p>
          )}
        </form>
        
      </div>
    </div>
  );
}

export default PostJob;
