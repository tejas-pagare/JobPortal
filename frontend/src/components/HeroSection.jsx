import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobText } from "../redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setSearchJobText(query));
    navigate("/browse");
  };
  return (
    <div className="flex justify-center p-4 gap-4">
      <div className="flex flex-col gap-6">
        <span className="bg-gray-100 text-red-600 text-sm font-semibold rounded-full mx-auto px-4 cursor-pointer py-2 ">
          No 1 Job Hunt Website
        </span>
        <h1 className=" text-3xl lg:text-5xl font-bold text-center">
          Search, Apply & <br />
          Get Your <span className="text-purple-600">Dream Jobs</span>
        </h1>
        <p className="text-md  tracking-tighter font-semibold text-gray-500 ">
          {" "}
          Whether you're a fresh graduate or an experienced professional,
          JobPortal makes finding your dream job easier than ever.
        </p>
        <div
          className="outline-none 
         w-full md:w-[90%] rounded-full overflow-hidden shadow-lg flex mx-auto "
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search a dream job"
            className="w-full h-full p-2 bg-gray-50 outline-none "
          />
          <Button
            onClick={onClickHandler}
            className="rounded-r-full bg-purple-800 hover:bg-purple-800"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
