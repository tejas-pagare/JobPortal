import express from 'express'

import isAuthenticated from '../middleware/isAuthenticated.js';
import { getCompany, getCompnayById, registerCompany, updateCompany } from '../controller/companyController.js';
import { getAdminsJob, getAllJobs, getJobById, postJob } from '../controller/jobController.js';

const route = express.Router();

route.post("/post",isAuthenticated,postJob);
route.get("/get",isAuthenticated,getAllJobs);
route.get("/getadminjobs",isAuthenticated, getAdminsJob);
route.get("/get/:id",isAuthenticated, getJobById);

export default route;