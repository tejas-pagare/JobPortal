import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../../utils/constant.js";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const EventChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
       try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        if(response.data.user?.role==='recruiter') {
          navigate('/admin/companies');
         
        }else{
          navigate("/");

        }
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={onSubmitForm}
          action={""}
          className="w-[70%] md:w-[50%] border border-gray-200 rounded-md p-4 my-10 flex flex-col  gap-2"
        >
          <h1 className="text-3xl font-bold">Login</h1>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              value={input.email}
              onChange={EventChangeHandler}
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              value={input.password}
              onChange={EventChangeHandler}
              name="password"
              id="password"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="flex gap-4 items-center">
              <div className="flex gap-1 items-center">
                <Input
                  className="cursor-pointer"
                  id="student"
                  type="radio"
                  name="role"
                  placeholder="Enter student"
                  value="student"
                  checked={input.role === "student"}
                  onChange={EventChangeHandler}
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Input
                  className="cursor-pointer"
                  id="recruiter"
                  name="role"
                  type="radio"
                  placeholder="Enter recruiter"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={EventChangeHandler}
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
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
                Login
              </Button>
            </>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-700" to="/signup">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
