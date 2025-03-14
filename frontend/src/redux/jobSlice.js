import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name:"All jobs",
  initialState:{
    Alljobs: [],
    AllAdminJobs:[],
    searchAdminJobText:"",
    AppliedJobs:[],
    searchJobText:"",
    filterSearchText:""
  },
  reducers:{
    setAllJobs:(state,action)=>{
      state.Alljobs=action.payload
    },
    setAllAdminJobs:(state,action)=>{
      state.AllAdminJobs=action.payload
    },
    setSearchAdminJobText:(state,action)=>{
      state.searchAdminJobText=action.payload
    },
    setAppliedJobs:(state,action)=>{
      state.AppliedJobs=action.payload
    },
    setSearchJobText:(state,action)=>{
      state.searchJobText=action.payload
    },
    setFilterSearchText:(state,action)=>{
      state.filterSearchText = action.payload;
    }
  }
})

export const {setAllJobs,setAllAdminJobs,setSearchAdminJobText,setAppliedJobs,setSearchJobText,setFilterSearchText} = jobSlice.actions;
export default jobSlice.reducer