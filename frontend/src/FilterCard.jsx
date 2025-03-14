import React, { useEffect, useState } from "react";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setFilterSearchText } from "./redux/jobSlice";

function FilterCard() {
  const [filterValue,setfilterValue] = useState("");
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(setFilterSearchText(filterValue));
    return ()=>{
      dispatch(setFilterSearchText(""));
    }
    
  },[filterValue]);
  const fliters = [
    {
      title: "Locations",
      values: ["Delhi", "Pune", "Mumbai", "Banglore", "Hyderabad"],
    },
    {
      title: "Industry",
      values: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack developer",
        "AI/Ml",
      ],
    },
    {
      title: "Salary",
      values: ["0-40K", "42K-1Lakh", "1lakh-5lakh"],
    },
  ];
  return (
    <div className="bg-white w-full rounded-mda">
      <h1 className="font-semibold my-3">Filter Jobs</h1>
      <div className="flex flex-col gap-4">
      <RadioGroup onValueChange={(value)=>{
                  setfilterValue(value)
                }} >
        {fliters.map((filter) => {
          return (
            <div>
              {<h1 className="text-lg font-bold py-2">{filter.title}</h1>}
              {
             
                  
                    filter.values.map((val)=>{
                     return <div className="flex items-center space-x-2 m-1">
                    <RadioGroupItem className="text-xs" value={val} id={val} />
                    <Label className="text-xs" htmlFor={val}>{val}</Label>
                  </div>
                    })
                  
                  
               
              }

            </div>
             
          );
        })}
         </RadioGroup>
      </div>
    </div>
  );
}

export default FilterCard;
