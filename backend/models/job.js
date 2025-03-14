import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  }, description: {
    type: String,
    required: true,
  }, requirements: [{
    type: String,
    required: true,
  }],
  salary: {
    type: Number,
    required: true,
  }, experienceLevel: {
    type: String,
    required: true,
  }, location: {
    type: String,
    required: true,
  }, positions: {
    type: Number,
    required: true,
  }, company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true,
  },
  jobType: {
      type: String,
      required: true
  }, created_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  }, applications: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Application',
    default:[]
  }]
}, {
  timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;