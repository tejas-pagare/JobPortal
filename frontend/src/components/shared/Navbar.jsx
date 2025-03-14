import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { LogIn, User2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice";

function Navbar() {
  let { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="bg-white px-8 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto min-w-6xl h-24 md:h-16">
        <div className="font-bold text-2xl cursor-pointer">
          <h1>
            Job<span className="text-[#f83002]">Portal</span>
          </h1>
        </div>

        <div className="flex gap-8 overflow-hidden">
          <ul className="flex font-medium items-center gap-4">
            {user && user.role === "recruiter" ? (
              <>
                <Link to={"/admin/companies"}>
                  <li className="cursor-pointer">Companies</li>
                </Link>
                <Link to={"/admin/jobs"}>
                  <li className="cursor-pointer">Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/"}>
                  <li className="cursor-pointer">Home</li>
                </Link>
                <Link to={"/jobs"}>
                  <li className="cursor-pointer">Jobs</li>
                </Link>
                <Link to={"/browse"}>
                  <li className="cursor-pointer">Browse</li>
                </Link>
              </>
            )}
          </ul>
          <div>
            {!user && (
              <div className="flex gap-3 items-center">
                <Link to={"/login"}>
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to={"/signup"}>
                  <Button className="bg-purple-800 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            {user && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="h-[40px] z-100 w-[40px] overflow-hidden rounded-full cursor-pointer mt-2">
                    <img
                      className="h-full w-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYwM33sSN7MtnLIq0k1qjhpoEtSstLE26gA&s"
                      alt=""
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 border-none p-2 border-[1px] bg-gray-50 rounded-md shadow-lg">
                  <div className="flex gap-4 items-start">
                    <Avatar />
                    <div>
                      <h1 className="font-bold">{user.fullname}</h1>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="my-4 flex flex-col gap-4">
                   {user.role!=='recruiter'&& <div className="flex gap-3  items-center">
                      <User2 />
                      <Link to={"/profile"}>
                        <Button variant="link">View profile</Button>
                      </Link>
                    </div>}
                    <div className="flex gap-2 items-center">
                      <LogIn />
                      <Button onClick={logoutHandler} variant="link">
                        Log out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

const Avatar = () => {
  return (
    <div className="h-[40px] z-100 w-[40px] overflow-hidden rounded-full cursor-pointer mt-2">
      <img
        className="h-full w-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYwM33sSN7MtnLIq0k1qjhpoEtSstLE26gA&s"
        alt=""
      />
    </div>
  );
};
