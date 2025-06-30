import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials =()=>{
    return(
        <>
        <div className="mt-20 pb-5 p-5">
        <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl font-semibold text-center text-mine-shaft-100 mb-3">
          What <span className="text-bright-sun-400"> User</span> says about us?
        </div>
        <div className="flex justify-evenly md-mx:flex-wrap mt-10 gap-2">
        {
            testimonials.map((data,index)=> <div key={index} className="flex flex-col gap-3 w-[23%] md-mx:w-[48%] border border-bright-sun-400 xs-mx:w-full p-3 rounded-xl ">
            <div className="flex gap-2 items-center">
                <Avatar className="!h-14 !w-14" src="avatar.png" alt="it's me"/>
                <div>
                    <div className="text-lg sm-mx:text-base xs-mx:text-xm text-mine-shaft-100 font-semibold">{data.name}</div>
                    <Rating value={data.rating} fractions={2} readOnly />
                </div>
            </div>
            <div className="text-xs text-mine-shaft-300">{data.testimonial}</div>
        </div>)
        }
</div>
        
        </div>
        </>
    )
}

export default Testimonials;