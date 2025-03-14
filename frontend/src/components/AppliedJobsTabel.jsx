import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import { useSelector } from "react-redux";
const jobApplications = [
  {
    id: 1,
    date: "2024-02-15",
    job_title: "Frontend Developer",
    companyname: "TechCorp",
    status: "Pending"
  },
  {
    id: 2,
    date: "2024-02-20",
    job_title: "Backend Developer",
    companyname: "CodeWorks",
    status: "Selected"
  },
  {
    id: 3,
    date: "2024-02-25",
    job_title: "Full Stack Developer",
    companyname: "DevSolutions",
    status: "Rejected"
  },
  {
    id: 4,
    date: "2024-03-01",
    job_title: "UI/UX Designer",
    companyname: "Designify",
    status: "Pending"
  },
  {
    id: 5,
    date: "2024-03-05",
    job_title: "Data Analyst",
    companyname: "DataCorp",
    status: "Rejected"
  },
  {
    id: 6,
    date: "2024-03-10",
    job_title: "Software Engineer",
    companyname: "InnoTech",
    status: "Selected"
  }
];

function AppliedJobsTabel() {
  
  const {AppliedJobs} = useSelector(store=>store.job);
    return (
    <div>
      <Table>
        <TableCaption>List of jobs applied</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Jobs Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AppliedJobs.length>0&&AppliedJobs.map((jobapplied) => (
            <TableRow key={jobapplied.id}>
              <TableCell className="font-medium">{jobapplied.createdAt.split("T")?.[0]}</TableCell>
              <TableCell>{jobapplied?.job?.title}</TableCell>
              <TableCell>{jobapplied?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
               <Badge className={jobapplied.status==="rejected" ? "bg-red-600 hover:bg-red-600" :"" ||jobapplied.status==="rejected" ? "bg-gray-700 hover:bg-gray-700" :"" ||jobapplied.status==="pending" ? "bg-green-600 hover:bg-green-600" :""}>
               {jobapplied.status}
                </Badge> 
              </TableCell>
            </TableRow>
          ))}
          {
            AppliedJobs.length<=0&&<div className="font-bold text-lg text-gray-500">
              You haven't Applied to any job yet
            </div>
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobsTabel;
