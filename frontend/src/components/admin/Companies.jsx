import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyText } from '../../redux/companySlice'

function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  const [input,setInput] = useState("");
  useEffect(()=>{
    dispatch(setSearchCompanyText(input));
  },[input]);
  const onChangeHandler = (e)=>{
    setInput(e.target.value);
  
  }
  return (
    <div>
      <Navbar/>
      <div className='max-w-5xl mx-auto my-12'>
      <div className='flex justify-between'>
        <Input value={input} onChange={onChangeHandler} className="w-fit outline-none"  placeholder="FilterName by name " />
        <Button onClick={()=>navigate('/admin/companies/create')} >
          New Compnay
        </Button>
      </div>
      <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
