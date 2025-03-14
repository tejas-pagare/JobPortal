import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar';
import ApplicantsTabel from './ApplicantsTabel';
import axios from 'axios';
import { Application_API_ENDPOINT } from '../../utils/constant';

function Applicants() {
  const [applicants,setApplicants] = useState(null);
  const params = useParams();
  const {id} = params;

  const fetchAllApplicants = async()=>{
    try {
      const res = await axios.get(`${Application_API_ENDPOINT}/${id}/applicants`,{withCredentials:true});
      
      setApplicants(res?.data?.job?.applications)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
fetchAllApplicants();
  },[])
  if(!applicants)return <div>Loading....</div>
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-xl font-bold'> Applicants ({applicants?.length})</h1>
        <ApplicantsTabel applicants={applicants}/>
      </div>

    </div>
  )
}

export default Applicants
