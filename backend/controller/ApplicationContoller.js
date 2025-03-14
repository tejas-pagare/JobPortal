import Application from "../models/application.js";
import Job from "../models/job.js";
export const applyJob = async(req,res)=>{
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if(!jobId){
      res.status(400).json({
        message:"Job id is required",
        success:false
      })
      return;
    }

    const checkExistingJob = await Application.findOne({job:jobId,applicant:userId});
    if(checkExistingJob){
      res.status(400).json({
        message:"You have already applied for this job",
        success:false
      })
      return;
    }

    const job = await Job.findById(jobId);
    if(!job){
      res.status(404).json({
        message:"Job not found",
        success:false
      })
      return;
    }
    const application = await Application.create({
      job:jobId,
      applicant:userId,
      status:"pending"
    });
    job.applications.push(application);
    await job.save();
    res.status(200).json({
      message:"Application submitted successfully",
      application,
      success:true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message:"Internal server error", success: false});
  }
}

// get job apllied by user
export const getAppliedJobs = async(req,res)=>{
 try {
  const userId = req.id;
  const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
    path:"job",
    options:{sort:{createdAt:-1}},
    populate:{
      path:'company',
      options:{sort:{createdAt:-1}},
    }
  })

  if(!application){
    return res.status(404).json({
      message:"No application found",
      success:false
    })
  }

  res.status(200).json({
    message:"Applications fetched successfully",
    applications:application,
    success:true
  })
 } catch (error) {
  console.log(error);
  res.status(500).json({ message:"Internal server error", success: false});
 }

}


export const getAllApplicant = async(req,res)=>{
try {
  const jobId = req.params.id;
  if(!jobId){
    return res.status(400).json({
      message:"Job id is required",
      success:false
    })
  }

  const job = await Job.findById(jobId).populate({
    path:"applications",
    options:{sort:{createdAt:-1}},
    populate:{
      path:'applicant',
      options:{sort:{createdAt:-1}},
    }
    
  })

  if(!job){
    return res.status(404).json({
      message:"Job not found",
      success:false
    })
  }

  return res.status(200).json({
    message:"All applicants fetched successfully",
    job,
    success:true
  })
} catch (error) {
  console.log(error);
  res.status(500).json({ message:"Internal server error", success: false});
}
  


  
}

export const updateApplicationStatus = async(req,res)=>{
  try {
    let {status} = req.body;
    
    let ApplicationId = req.params.id;
    if(!status) {
      return res.status(400).json({
        message:"Status is required",
        success:false
      })
    }
    status = status.toLowerCase();
    const updateApplication = await Application.findByIdAndUpdate(ApplicationId,{status},{new:true});
    if(!updateApplication){
      return res.status(404).json({
        message:"Application not found",
        success:false
      })
    }
    return res.status(200).json({
      message:"Application status updated successfully",
      application:updateApplication,
      success:true
    })

  } catch (error) {
    console.log(error);
  res.status(500).json({ message:"Internal server error", success: false});
  }
}