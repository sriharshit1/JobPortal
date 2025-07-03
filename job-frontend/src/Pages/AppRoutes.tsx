import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { Divider } from "@mantine/core";
import FindJobsPage from "./FindJobsPage";
import JobDescPage from "./JobDescPage";
import ApplyJobPost from "./ApplyJobPage";
import FindTalentPage from "./FindTalentPage";
import CompanyPage from "./CompanyPage";
import PostedJobPage from "./PostedJobPage";
import JobHistoryPage from "./JobHistoryPage";
import TalentProfilePage from "../FindTalent/TalentProfilePage";
import PostJobPage from "./PostJobPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import ProtectedRoute from "../Services/ProtectedRoute";
import PublicRoute from "../Services/PublicRoute";
import ResumePage from "./ResumePage";
import ScrollToTop from "../Components/Global/ScrollToTop";
import { useEffect } from "react";
import { setupResponseInterpretor } from "../Intrceptor/AxiosInterceptor";


const AppRoutes=()=>{
    const user = useSelector((state:any)=>state.user);
    const navigate=useNavigate();

    useEffect(()=>{
      setupResponseInterpretor(navigate);
    },[navigate]);
    return(
        <>
         
          <ScrollToTop/>
      <div className='relative'>
      <Header/>
      <Divider size="xs" mx="md"/>
      <Routes>
        <Route path='/find-jobs' element={<FindJobsPage/>}/>
        <Route path='/jobs/:id' element={<JobDescPage/>}/>
        <Route path='/apply-job/:id' element={<ProtectedRoute allowedRoles={['APPLICANT']}><ApplyJobPost/></ProtectedRoute>}/>
        <Route path='/find-talent' element={<FindTalentPage/>}/>
        <Route path='/company/:companyName' element={<CompanyPage/>}/>
        <Route path='/posted-job/:id' element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostedJobPage/></ProtectedRoute>}/>
        <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT']}><JobHistoryPage/></ProtectedRoute>}/>
        <Route path='/talent-profile/:id' element={<TalentProfilePage/>}/>
        <Route path='/post-jobs/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage/></ProtectedRoute>}/> 
        <Route path='/signup' element={<PublicRoute><SignUpPage/></PublicRoute>}/> 
        <Route path='/login' element={<SignUpPage/>}/> 
        <Route path='/profile' element={<ProfilePage/>}/> 
        <Route path="/resume" element={<ProtectedRoute allowedRoles={['APPLICANT']}><ResumePage /></ProtectedRoute>} />
        <Route path='*' element={<HomePage/>}/>
      </Routes>
      <Footer/>
      </div>
     
        </>
    )
}

export default AppRoutes;