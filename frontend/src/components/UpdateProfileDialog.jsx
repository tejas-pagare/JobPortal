import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice";
function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume,
  });

  const onChangeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
  };

  const FileChangeHandler = (e) => {
    const file = e.target?.files?.[0];
    setInput({ ...input, file: file });
  };
  const onSumbitHandler = async (e) => {
    e.preventDefault();
       const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully!");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };
  return (
    <div className="p-6">
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSumbitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  value={input.fullname}
                  onChange={onChangeHandler}
                  className="col-span-3"
                  name="fullname"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  onChange={onChangeHandler}
                  value={input.email}
                  type={"email"}
                  className="col-span-3"
                  name="email"
                />
              </div>{" "}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  onChange={onChangeHandler}
                  value={input.bio}
                  className="col-span-3"
                  name="bio"
                />
              </div>{" "}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  onChange={onChangeHandler}
                  value={input.skills}
                  className="col-span-3"
                  name="skills"
                />
              </div>{" "}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  onChange={onChangeHandler}
                  value={input.phoneNumber}
                  className="col-span-3"
                  name="phoneNumber"
                />
              </div>{" "}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  type="file"
                  accept="application/file"
                  id="file"
                  className="col-span-3"
                  onChange={FileChangeHandler}
                  name="file"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button
                  onClick={() => setLoading(true)}
                  type="submit"
                  className="w-full my-4"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
