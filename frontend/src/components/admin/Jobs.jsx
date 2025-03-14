import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { setSearchAdminJobText } from '../../redux/jobSlice'
import useGetAdminJobs from '../../hooks/useGetAdminJobs'
import AdminJobsTable from './AdminJobsTable'

function Jobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAdminJobs()
  const [input,setInput] = useState("");
  useEffect(()=>{
    dispatch(setSearchAdminJobText(input));
  },[input]);

  const onChangeHandler = (e)=>{
    setInput(e.target.value);
  
  }
  return (
    <div>
      <Navbar/>
      <div className='max-w-5xl mx-auto my-12'>
      <div className='flex justify-between'>
        <Input value={input} onChange={onChangeHandler} className="w-fit tracking-tighter text-xs outline-none"  placeholder="Filter By Company or Role " />
        <Button onClick={()=>navigate('/admin/jobs/create')} >
          New Job
        </Button>
      </div>
      <AdminJobsTable/>
      </div>
    </div>
  )
}

export default Jobs
