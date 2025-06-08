import express from 'express'
import { login, logout, register, updateProfile } from '../controller/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import singleUpload from '../middleware/multer.js';
import multer from 'multer';
const upload = multer();
const route = express.Router();

route.post("/register",singleUpload,register);
route.post("/login",login);
route.post("/profile/update",upload.single('file'),isAuthenticated, updateProfile);
route.get("/logout",logout);

export default route;
