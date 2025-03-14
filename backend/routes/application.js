import express from 'express'

import isAuthenticated from '../middleware/isAuthenticated.js';
import { applyJob, getAllApplicant, getAppliedJobs, updateApplicationStatus } from '../controller/ApplicationContoller.js';


const route = express.Router();

route.get("/apply/:id",isAuthenticated,applyJob);
route.get("/get",isAuthenticated,getAppliedJobs);
route.get("/:id/applicants",isAuthenticated, getAllApplicant);
route.put("/status/:id/update",isAuthenticated, updateApplicationStatus);

export default route;