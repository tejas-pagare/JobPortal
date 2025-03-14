import Company from '../models/company.js'
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      res.status(400).json({
        mesaage: "Please enter company name",
        success: false
      });
      return;
    }

    let findCompany = await Company.findOne({ name: companyName });
    if (findCompany) {
      res.status(400).json({
        message: "Company already register",
        success: false
      })
      return;
    }


    let company = await Company.create({
      name: companyName,
      userId: req.id
    });

    res.status(200).json({
      message: "Company registered successfully",
      company,
      success: true
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to register company",
      success: false
    })
    return;
  }
}

export const getCompany = async (req, res) => {
  // get company all created by a user (valid && logged in user)
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });
    res.status(200).json({

      success: true,
      companies
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }

}

export const getCompnayById = async (req, res) => {
  try {
    const companyId = req.params.id;
      const company = await Company.findById(companyId);
    if (!company) {
      res.status(404).json({
        message: "Company not found",
        success: false
      })
      return;
    }
    res.status(200).json({
      company,
      success: true
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }

}

export const updateCompany = async (req, res) => {

  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;
    const file = req.file;
    //const fileuri=getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(file.path, {
    //   folder: 'uploads',
    //   timeout: 600000,
    // });
    //const logo = cloudResponse.secure_url;
    let updateData = {
      name,
      description,
      website,
      location,
     // logo
    }

    const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });
    
    if (!updatedCompany) {
      res.status(400).json({
        message: "Company not Found",
        success: false
      })
      return;
    }
    res.status(200).json({
      message: "Company information updated successfully",
      company:updatedCompany,
      success: true
    })
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }

}