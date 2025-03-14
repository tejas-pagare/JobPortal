import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Mail, Pen, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTabel from "./AppliedJobsTabel";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

function Profile() {
  useGetAppliedJobs();
  let skills = ["reactjs", "html", "javascript", "css"];
  let resume = true;
  const { user } = useSelector((store) => store.auth);
  let [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
{user&&  <>
      <div className="w-[80%] mx-auto bg-white border border-gray-200 rounded-md p-6 my-5 ">
        <>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex  flex-col md:flex-row  gap-6">
                <Avatar />
                <div>
                  <h1 className="text-xl font-bold">
                    {user?.fullname || "Tejas Pagare"}
                  </h1>
                  <p className="text-gray-700 text-xs md:text-sm">
                    {user?.profile?.bio || "this is a web application"}
                  </p>
                </div>
              </div>
              <Button onClick={() => setOpen(true)} variant="outline">
                <Pen />
              </Button>
            </div>
            <div className="my-4 flex flex-col gap-4">
              <div className="flex items-center justify-start gap-6">
                <Mail />
                {user?.email || "tejaspagare1625@gmail.com"}
              </div>
              <div className="flex items-center justify-start gap-6">
                <Phone /> {user?.phoneNumber || "7558388619"}
              </div>
            </div>
          </div>
          <div>
            <h3>Skills</h3>
            <div className="flex gap-4 flex-wrap py-4">
              {user?.profile?.skills.length > 0 &&
                user?.profile?.skills.map((e, i) => {
                  return <Badge>{e}</Badge>;
                })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md font-bold">Resume</Label>
            {resume && (
              <a href={`${user?.profile?.resume}`} target="blank" className="text-blue-600">
                {
                  user.profile?.resumeOriginalName
                }
              </a>
            )}
            {!resume && <span>NA</span>}
          </div>
        </>
      </div>
      <div className="max-w-5xl mx-4 sm:mx-auto">
        <h1 className="text-lg font-bold my-4 mx-2">Applied Jobs</h1>
        <AppliedJobsTabel />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      </>}
    </div>
  );
}

export default Profile;

const Avatar = () => {
  return (
    <div className="h-[50px] w-[50px] overflow-hidden rounded-full cursor-pointer mt-2">
      <img
        className="h-full w-full"
        src="https://github.com/shadcn.png"
        alt=""
      />
    </div>
  );
};
