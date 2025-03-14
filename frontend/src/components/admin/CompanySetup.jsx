import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { ArrowBigLeft, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from 'axios';
import { Company_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import useGetCompanyById from "../../hooks/useGetCompanyById";

function CompanySetup() {
  const params = useParams();
  const { id } = params;
  useGetCompanyById(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {singleCompany} = useSelector(store=>store.company);
  
  const [loading,setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const changeEventHandler  = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const onChangeFileHandler= (e)=>{
    setInput({...input,file:e?.target?.files?.[0]})
  } 

  useEffect(() => {
    
    setInput({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: singleCompany?.file || null
    })
},[singleCompany]);

  const onSubmitHandler = async()=>{
    const formData = new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    
    formData.append("website",input.website);
    formData.append("location",input.location);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${Company_API_ENDPOINT}/update/${id}`,formData,{ headers:{
        "Content-Type":"multipart/form-data"
      },withCredentials:true});
      if(res.data.success){
       dispatch(setSingleCompany(res.data.company));
              navigate('/admin/companies');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }

  }
  return (
    <div>
      <Navbar />
      <div className="my-10 max-w-xl mx-auto px-4">
        <div className="flex gap-2 items-center">
          <Button onClick={()=>navigate('/admin/companies')} variant="outline" className="flex gap-1 text-gray-600">
            <div>
              <ArrowLeft />
            </div>
            <div>Go back</div>
          </Button>
          <div className="font-bold text-xl">Company Setup</div>
        </div>
        <div className="flex flex-col gap-8 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label htmlFor="description">description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label htmlFor="location">location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label htmlFor="logo">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={onChangeFileHandler}
              />
            </div>
          </div>
          {
            loading ? <Button > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :<Button onClick={onSubmitHandler}>  Update</Button>
          }
          
        </div>
      </div>
    </div>
  );
}

export default CompanySetup;
