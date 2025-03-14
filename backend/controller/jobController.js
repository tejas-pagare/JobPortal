import Job from "../models/job.js";

// admin post karega jo usa ke liye
export const postJob = async(req,res)=>{
 try {
  const {title,description,salary,requirements,experienceLevel,location,positions,companyId,jobType}=req.body;
  if (!title || !description || !salary || !requirements || !experienceLevel || !location || !positions || !companyId || !jobType) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
  const userId = req.id;
  const job = await Job.create({
    title,
    description,
    salary:Number(salary),
    requirements:requirements.split(','),
    experienceLevel,
    location,
    positions,
    company:companyId,
    jobType,
    created_by:userId,
  })
  res.status(200).json({ message:"Job created successfully", success: true,job});
  return;
 } catch (error) {
  console.log(error);
  res.status(400).json({ message:"Job not created", success: false});
 }
}


// student ke liye
export const getAllJobs = async(req,res)=>{
try {
  const keyword = req?.query?.keyword || "";
  const query = {
    $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
    ]
};
  const jobs = await Job.find(query).populate('company').populate('applications');
  if(!jobs){
    res.status(400).json({
      message:"No jobs found",
      success:false
    })
    return;
  }

  res.status(200).json({
    message:"Jobs found successfully",
    success: true,
    jobs
  })
} catch (error) {
  console.log(error);
  res.status(500).json({ message:"Internal server error", success: false});
 }

}

export const getJobById = async(req,res)=>{
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate('applications');
    if(!job){
      res.status(404).json({
        message:"Job not found",
        success:false
      })
      return;
    }
    res.status(200).json({
      message:"Job found successfully",
      success: true,
      job
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:"Internal server error", success: false});
  }
}

// finding jobs created by admin

export const getAdminsJob = async(req,res)=>{
try {
  const adminId = req.id;
  const jobs = await Job.find({created_by:adminId}).populate('company');
  if(!jobs){
    res.status(400).json({
      message:"No jobs found",
      success:false
    })
    return;
  }

  res.status(200).json({
    message:"Jobs found successfully",
    success: true,
    jobs
  })
} catch (error) {
  console.log(error);
  res.status(500).json({ message:"Internal server error", success: false});
}


}