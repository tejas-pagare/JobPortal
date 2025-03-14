import mongoose from "mongoose"

const dbConnection = async()=>{
try {
  await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
  console.log("Error connecting to MongoDB");
  process.exit(1);
}
}

export default dbConnection;