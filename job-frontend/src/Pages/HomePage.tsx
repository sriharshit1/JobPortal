import { count } from "console";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Companies from "../LandingPage/Companies";
import DreamJob from "../LandingPage/DreamJob";
import JobCategroy from "../LandingPage/JobCategory";
import Subscribe from "../LandingPage/Subscribe";
import Testimonials from "../LandingPage/Testimonials";
import Working from "../LandingPage/Working";
import {useState} from "react";

const HomePage = ()=>{

    return (
        <>
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins]">
            
            <DreamJob/>
            <Companies/>
            <JobCategroy/>
            <Working/>
            <Testimonials/>
            <Subscribe/>
    
        </div>
        </>
    )
}

export default HomePage;