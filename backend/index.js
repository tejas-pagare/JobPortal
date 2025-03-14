import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import dbConnection from "./utils/db.js";
import userRouter from './routes/user.js'
import companyRouter from './routes/company.js';
import jobRouter from './routes/job.js';
import applicationRouter from './routes/application.js';
import path from "path";
config({});
const PORT = process.env.PORT|| 3000;
const app = express();
const _dirname = path.resolve();
// basic middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
  origin:"https://myjobportal-iwc6.onrender.com",
  credentials:true
}
app.use(cors(corsOptions));


//api's
app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.use("*",(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})


app.listen(PORT,()=>{
  // db connection
dbConnection()
  console.log("Server started at " + PORT);
})