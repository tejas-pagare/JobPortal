import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      res.status(400).json({
        message: "Enter a valid data some fields are missing",
        success: false
      })
      return;
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(400).json({
        message: "Email already exists",
        success: false
      })
      return;
    }
    const file = req.file;
    const dataurires = getDataUri(file);
   // const cloudResponse = await cloudinary.uploader.upload(dataurires.content);
   const cloudResponse = await cloudinary.uploader.upload_stream(
    { resource_type: "auto" },
    (error, result) => {
      if (error) return console.error("Upload error:", error);
        }
  ).end(file.buffer);
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      fullname: fullname.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber,
      password: hashedPassword,
      role: role.trim(),
      profile:{
          profilePhoto:cloudResponse.secure_url,
      }
    });


    res.status(200).json({
      message: "Account created successfully",
      success: true
    })
    return;

  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Failed to register user",
      success: false
    })
  }

}


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400).json({
        message: "Enter a valid data some fields are missing",
        success: false
      })
      return;
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(400).json({
        message: "Email valid email",
        success: false
      })
      return;
    }

    const isCorrectPassword = await bcrypt.compare(password, findUser.password);
    if (!isCorrectPassword) {
      res.status(400).json({
        message: "Invalid password",
        success: false
      })
      return;
    }
   
    if (role !== findUser.role) {
      res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false
      });
      return;
    }
    const tokenData = {
      userId: findUser._id
    }
    const user = {
      id: findUser._id,
      fullname: findUser.fullname,
      email: findUser.email,
      phoneNumber: findUser.phoneNumber,
      role: findUser.role,
      profile: findUser.profile
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
      message: "Welcome back " + findUser.fullname,
      success: true,
      user
    })
    return;

  } catch (error) {
    res.status(400).json({
      message: "Failed to login user",
      success: false
    })
    return;
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true
    })
  } catch (error) {
    res.status(400).json({
      message: "Failed to logout user",
      success: false
    })
    return;
    console.log(error);
  }
}

export const updateProfile = async (req, res) => {
  try {
    let { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const cloudinaryResponse = ""
    // Check file size (e.g., max 5MB)
    if (file) {
      const fileuri = getDataUri(file);
         cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content)

    }
    let splitArray = [];
    if (skills) {
      splitArray = skills.split(',');
    }
      const userId = req.id;
    const user = await User.findOne({ _id: userId });

    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (splitArray) user.profile.skills = splitArray;
    if (email) user.email = email;
    
    if (cloudinaryResponse) {
      user.profile.resume = cloudinaryResponse.secure_url; // cloudinary pe uploaded image ke url
      user.profile.resumeOriginalName = file.originalname; // uploaded file ka origina name
    }

    await user.save();

    const updatedUser = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    res.status(200).json({
      message: "Account updated successfully",
      success: true,
      user: updatedUser
    })


  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: "Failed to update user",
      success: false
    })
  }
}


