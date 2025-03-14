import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  name: {
    type: String, required: true,
  }, description: {
    type: String,
  },
  website:{
      type:String 
  }, description: {
    type: String,
  }, location: {
    type: String,
  }, logo: {
    type: String, // company ka logo
  }, userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // userId ko reference hone se userSchema ma data access karega and kis user ne create kiya he ye company
  }
}, {
  timestamps: true, // created_at and updated_at fields ka time add kar sakte hai
});

const Company = mongoose.model('Company', companySchema);
export default Company;
