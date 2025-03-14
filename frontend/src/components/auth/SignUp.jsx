import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'

function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [input,setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });

  const EventChangeHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }
  const EventFileHandler = (e)=>{
    
    setInput({...input, file:e.target.files[0]});
  }

  const onSubmitForm = async(e)=>{
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullname",input.fullname);
      formData.append("email",input.email);
      formData.append("password",input.password);
      formData.append("role",input.role);
      formData.append("phoneNumber",input.phoneNumber);
      if(input.file){
        formData.append("file",input.file);
      }

     

      const response = await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },withCredentials:true
      });
      if(response.data.success){
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar/>
      <div className='flex flex-col items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={onSubmitForm} action={""} className='w-[85%] md:w-[50%] border border-gray-200 rounded-md p-4 my-10 flex flex-col  gap-2'>
        <h1 className='text-3xl font-bold'>Sign up</h1>
          <div>
          <Label htmlFor="fullname">Fullname</Label>
          <Input value={input.fullname} onChange={EventChangeHandler} id="fullname" name="fullname" type="text" placeholder="Enter fullname"/>

          </div>
          <div>
          <Label htmlFor="email">Email</Label>
          <Input value={input.email} onChange={EventChangeHandler}  id="email" name="email" type="email" placeholder="Enter Email"/>

          </div>

          <div>
          <Label htmlFor="password">Password</Label>
          <Input value={input.password} onChange={EventChangeHandler} id="password" name="password" type="password" placeholder="Enter password"/>

          </div>
          <div>
          <Label htmlFor="phonenumber">Phonenumber</Label>
          <Input value={input.phoneNumber} onChange={EventChangeHandler} id="phonenumber" name="phoneNumber" type='number' placeholder="Enter phonenumber"/>

          </div>
          <div className='flex flex-col justify-start items-start gap-3 md:flex-row md:items-center md:justify-between my-4'>

          <div className='flex gap-4 items-center'>
            <div className='flex gap-1 items-center'>
            <Input checked={input.role==='student'} onChange={EventChangeHandler} className="cursor-pointer" id="student" type="radio" name="role" placeholder="Enter student" value="student"/>
            <Label htmlFor="student">Student</Label>
            </div>
            <div className='flex gap-1 items-center'>
            <Input   checked={input.role==='recruiter'} onChange={EventChangeHandler}  className="cursor-pointer" id="recruiter" name="role"  type="radio" placeholder="Enter recruiter" value="recruiter"/>
            <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>

          <div className='flex gap-2 items-center'>
          <Label>Profile</Label>
          <Input onChange={EventFileHandler} accept="image/*" name="file" type="file" className="cursor-pointer"/>
          </div>
          </div>

          {!loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                Please wait
             
            </Button>
          ) : (
            <>
              <Button type="submit" className="w-full my-2">
                Signup
              </Button>
            </>
          )}

          <span className='text-sm'>Already have an account? <Link className='text-blue-700' to="/login">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default SignUp
