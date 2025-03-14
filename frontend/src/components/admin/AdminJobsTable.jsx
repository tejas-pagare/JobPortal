import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import useGetAdminJobs from "../../hooks/useGetAdminJobs";

function AdminJobsTable() {
  useGetAdminJobs();
  const navigate = useNavigate();
  const { AllAdminJobs, searchAdminJobText } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(AllAdminJobs);

  useEffect(() => {
    const filteredJobs = AllAdminJobs?.filter((job) =>
      job.company.name.toLowerCase().includes(searchAdminJobText.toLowerCase())||job.title.toLowerCase().includes(searchAdminJobText.toLowerCase())
    );
      setFilterJobs(filteredJobs);
  }, [searchAdminJobText,AllAdminJobs]);

  return (
    <div className="my-8">
      <Table>
        <TableCaption>List of recent register companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length >= 0 &&
            filterJobs.map((e) => {
              return (
                <TableRow>
                  <TableCell>{e?.company?.name}</TableCell>
                  <TableCell>{e?.title}</TableCell>
                  <TableCell>{(e?.createdAt).split("T")?.[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <MoreHorizontal />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32 p-1 cursor-pointer flex flex-col gap-2">
                        <div
                          onClick={() => {
                            navigate(`/admin/companies/${e._id}`);
                          }}
                          className="flex items-center gap-2  p-2 rounded-lg hover:bg-gray-100"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="text-sm">Edit</span>
                        </div>
                        <div onClick={()=>navigate(`/admin/jobs/${e._id}/applicants`)} className="flex gap-2 rounded-lg  p-2 items-center justify-start hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                          <span className="text-xs">Applications</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {filterJobs && filterJobs.length <= 0 && (
        <div>You haven't register any company</div>
      )}
    </div>
  );
}

export default AdminJobsTable;
