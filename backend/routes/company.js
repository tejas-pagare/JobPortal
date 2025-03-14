import express from 'express'

import isAuthenticated from '../middleware/isAuthenticated.js';
import { getCompany, getCompnayById, registerCompany, updateCompany } from '../controller/companyController.js';
import singleUpload from '../middleware/multer.js';

const route = express.Router();

route.post("/register",isAuthenticated,registerCompany);
route.get("/get",isAuthenticated,getCompany);
route.get("/get/:id",isAuthenticated, getCompnayById);
route.put("/update/:id",singleUpload, isAuthenticated, updateCompany);

export default route;