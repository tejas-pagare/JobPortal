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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetCompanyById from "../../hooks/useGetCompanyById";

function CompaniesTable() {
  const navigate = useNavigate();
  const {companies} = useSelector(store=>store.company);
  const [filterCompanies,setFilterCompanies] = useState(companies);
  const {searchCompanyText} = useSelector(store=>store.company);
  useEffect(()=>{
    const filteredCompanies = companies?.filter((company)=>company.name.toLowerCase().includes(searchCompanyText.toLowerCase()));
  
    setFilterCompanies(filteredCompanies);

  },[searchCompanyText])

  return (
    <div className="my-8">
      <Table>
        <TableCaption>List of recent register companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterCompanies?.length>=0&& filterCompanies.map((company)=>{
              return  <TableRow>
              <TableCell>
                <div className="h-8 w-8 overflow-hidden">
                  <img
                    className="w-full h-full rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EgD1wsceDe_Crja5DEXjN-LB4pt9NN3tfcFqePuMYapcfHOQkTvEETTM2IdZKQB5AvQ&usqp=CAU"
                  />
                </div>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{(company.createdAt).split("T")?.[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <MoreHorizontal />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 cursor-pointer">
                    <div onClick={()=>{
                      
                      navigate(`/admin/companies/${company._id}`)}} className="flex items-center gap-2">
                      <Edit2 className="text-xs" />
                      <span className="text-sm">Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
            })
          }
          {
            filterCompanies&&filterCompanies.length<=0&&<div>You haven't  register any company</div>
          }
         
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;

/**
 *  <img   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EgD1wsceDe_Crja5DEXjN-LB4pt9NN3tfcFqePuMYapcfHOQkTvEETTM2IdZKQB5AvQ&usqp=CAU" />
 */
