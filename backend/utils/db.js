import mongoose from "mongoose"

const dbConnection = async()=>{
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connection established  ")
  } catch (error) {
  console.log("Error connecting to MongoDB");
  process.exit(1);
}
}

export default dbConnection;