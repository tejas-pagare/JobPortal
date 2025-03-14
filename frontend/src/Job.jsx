import React from "react";
import { Button } from "./components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const {
    company,
    location,
    title,
    description,
    positions,
    jobType,
    salary,
    createdAt,
    _id: jobId,
  } = job;

  const date = new Date(createdAt);
  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    // Difference in milliseconds
    const diffInMs = now - date;

    // Convert to days, hours, minutes
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `just now`;
  }
  const navigate = useNavigate();

  return (
    <div className="bg-white border-[1px] shadow-lg p-4 rounded-xl flex gap-4 flex-col justify-center cursor-pointer h-fit">
      <div className="flex items-center justify-between">
        <p>{timeAgo(date)}</p>
        <Button size="icon" variant="outline">
          <Bookmark />
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EgD1wsceDe_Crja5DEXjN-LB4pt9NN3tfcFqePuMYapcfHOQkTvEETTM2IdZKQB5AvQ&usqp=CAU" />
          </Avatar>
        </Button>
        <div className="flex flex-col justify-start">
          <h1 className="text-md font-semibold">{company?.name}</h1>
          <p className="text-xs ">{location}</p>
        </div>
      </div>

      <div>
        <h1 className="text-md font-semibold">{title}</h1>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex gap-3 items-center">
        <Badge variant={"outline"} className={"text-blue-700 font-bold"}>
          {positions} Position
        </Badge>
        <Badge variant={"outline"} className={"text-red-700 font-bold"}>
          {jobType}
        </Badge>
        <Badge variant={"outline"} className={"text-purple-900 font-bold"}>
          {salary}LPA
        </Badge>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-purple-700 hover:bg-purple-800">
          Save for later
        </Button>
      </div>
    </div>
  );
}

export default Job;
