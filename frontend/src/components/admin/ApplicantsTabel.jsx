import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { Application_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";

function ApplicantsTabel({applicants}) {
 
  const status = ["Accepted", "Rejected"];
  const stautsUpdate = async(status,id)=>{
   
try {
  const res = await axios.put(`${Application_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true});
  if(res.data.success){
    toast.success(res.data.message);
  }
} catch (error) {
  toast.error(error.response.data.message);
}
  }
  return (
    <div className="mt-6">
      <Table>
        <TableCaption>Applicants for Job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants.length>0&&applicants.map((app)=>{
              return   <TableRow key={app?._id} >
              <TableCell>{app?.applicant?.fullname}</TableCell>
              <TableCell>{app?.applicant?.email}</TableCell>
              <TableCell>{app?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                <a href="#">Resume</a>
              </TableCell>
              <TableCell>{app?.createdAt.split("T")?.[0]}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                  <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-1 ">
                    {
                      status.map((s,i)=>{
                        return <div onClick={()=>stautsUpdate(s.toLowerCase(),app._id)}  key={i} className='flex w-fit p-2 items-center rounded-md hover:bg-gray-100 cursor-pointer'>
                        <span>{s}</span>
                    </div>
                      })
                    }
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
            })
          }
        
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTabel;
