
import React from 'react'
import { Button } from './components/ui/button'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'

import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/pages/Home'
import Jobs from './components/pages/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanyCreated from './components/admin/CompanySetup'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/Jobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AuthProtection from './components/auth/AuthProtection'

function App() {

  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Home/>,
      
    },{
      path:'/login',
      element:<AuthProtection> <Login/></AuthProtection>,
      
    },{
      path:'/signup',
      element:<AuthProtection><SignUp/></AuthProtection> ,
      
    },{
      path:'/jobs',
      element:<Jobs/>
      
    },{
      path:'/browse',
      element:<Browse/>
    },{
      path:'/profile',
      element:<Profile/>
    },{
      path:'/description/:id',
      element:<JobDescription/>
    }//admin routes start from here
    ,{
      path:'/admin/companies',
      element:<ProtectedRoute><Companies/></ProtectedRoute> 
    },{
      path:'/admin/companies/create',
      element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
    },{
      path:'/admin/companies/:id',
      element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
    },{
      path:'/admin/jobs',
      element:<ProtectedRoute> <AdminJobs/></ProtectedRoute>
    },{
      path:'/admin/jobs/create',
      element:<ProtectedRoute><PostJob/></ProtectedRoute> 
    },{
      path:'/admin/jobs/:id/applicants',
      element:<ProtectedRoute><Applicants/></ProtectedRoute> 
    }
  ])

  return (
    <RouterProvider router={appRouter}/>
    
  )
}

export default App
