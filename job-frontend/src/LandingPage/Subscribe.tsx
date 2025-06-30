import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { errorNotification, successNotification } from "../Services/NotificationService";

const Subscribe=()=>{
    const matches = useMediaQuery('(max-width-639px)')
    const matches1 = useMediaQuery('(max-width-475px)')

    const [email, setEmail] = useState("");

    const handleSubscribe=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        window.scrollTo({top:0, behavior:"smooth"})

        if(!emailRegex.test(email)){
           errorNotification("Invalid Email", "Please enter a valid email address");
            return;
        }
        successNotification("Subscribed","You have successfully subscribed to job updates")
        setEmail("");
    }


    return(
        <>
        <div className="mt-20 flex items-center bg-mine-shaft-900 mx-20 sm-mx:mx-5 py-3 rounded-xl justify-around flex-wrap">
        <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5 font-semibold text-center text-mine-shaft-100 ">
          Never wants to Miss Any <span className="text-bright-sun-400">Job News</span>
        </div>
        <div className="flex gap-4 rounded-xl xs-mx:flex-wrap bg-mine-shaft-700 px-3 py-2 xs:items-center">
            <TextInput value={email} onChange={(e)=>setEmail(e.currentTarget.value)} className="[&_input]:text-mine-shaft-100 font-semibold" variant="unstyled" placeholder="Your@gmail.com" size={matches1?"sm":matches?"md":"xl"}/>
            <Button className="!rounded-lg" size={matches1?"sm":matches?"md":"xl"} color="bright-sun.4" variant="filled" onClick={handleSubscribe}>Subscribe</Button>
        </div>
        </div>
        </>
    )
}

export default Subscribe;