import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FromValidation";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";
import { useEffect } from "react"; // already imported probably


const ResetPassword=(props:any)=>{

    //Apply by own 
    const passwordRef = useRef<HTMLInputElement>(null);
    const [otpValue, setOtpValue] = useState("");

    const [email,setEmail]=useState("");
    const[otpSent,setOtpSent]=useState(false);
    const[otpSending,setOtpSending]=useState(false);
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [passErr,setPassErr] = useState("")
    const [resendLoader,setResendLoader] = useState(false);
      const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {

    if(seconds===0){
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
    }else    setSeconds((s) => s - 1)}, 1000);

    const handleSendOtp=()=>{
        setOtpSending(true);
            sendOtp(email).then((res)=>{
                successNotification("OTP sent Successfully","Enter OTP to reset.")
                setOtpSent(true);
                setOtpSending(false);
                setResendLoader(true);
                interval.start();
            }).catch((err)=>{
                console.log(err);
                setOtpSending(false);
                errorNotification("OTP Sending Failed",err.response.data.errorMessage)
            })
    }
    const handleVerifyOtp=(otp:string)=>{
            verifyOtp(email,otp).then((res)=>{
                console.log(res);
                successNotification("OTP Verified.","Enter new Password")
                setVerified(true);
                setTimeout(()=>{
                    passwordRef.current?.focus();
                },100)
            }).catch((err)=>{
                console.log(err);
                errorNotification("OTP Verification Failed.",err.response.data.erorMessage)
            })

    }
    const resendOtp=()=>{
        if(resendLoader)return;
        handleSendOtp();
    }

     const changeEmail=()=>{
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }

    const handleRestPassword=()=>{
changePass(email,password).then((res)=>{
    console.log(res);
    successNotification("Password Changed","Login with new Password");
    props.close();
}).catch((err)=>{
    console.log(err);
    errorNotification("Password Reset Failed",err.response.data.erorMessage)
})
    }


    //Apply by own 
useEffect(() => {
  if (props.opened) {
    // Reset form state
    setEmail("");
    setOtpValue("");
    setOtpSent(false);
    setOtpSending(false);
    setVerified(false);
    setPassword("");
    setPassErr("");
    setResendLoader(false);
    setSeconds(60);
    interval.stop();
  }
}, [props.opened]);

    return(
        <>
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
        <div className="flex flex-col gap-6">
            <TextInput value={email} onChange={(e)=>setEmail(e.target.value)} name="email" size="md"
          withAsterisk
          leftSection={<IconAt size={16} />}
          rightSection={<Button loading={otpSending && !otpSent} size="xs" className="mr-1" onClick={handleSendOtp} autoContrast variant="filled" disabled={email==="" || otpSent}>
                    Login
                  </Button>}rightSectionWidth="xl"
          label="Email"
          placeholder="Your email"

        />
        {otpSent && <PinInput onComplete={handleVerifyOtp} length={6} disabled={verified} value={otpValue} onChange={setOtpValue} className="mx-auto" size="md" gap="lg" type="number"/>}
        {
            otpSent && !verified &&
            <div className="flex gap-2">
                <Button loading={otpSending} color="bright-sun.4" fullWidth onClick={resendOtp} autoContrast variant="light">
          {resendLoader?seconds:"Resend"}
        </Button>
        <Button fullWidth onClick={changeEmail} autoContrast variant="filled">
          Change Email
        </Button>
            </div>
        }
        {
            verified && <PasswordInput ref={passwordRef} value={password} onChange={(e)=>{setPassword(e.target.value); setPassErr(signupValidation("password",e.target.value))}} name="password" error={passErr}
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
        />
        }
         {
            verified &&  <Button fullWidth onClick={handleRestPassword} autoContrast variant="filled">
          Change Password
        </Button>
        }
        </div>
      </Modal>
        </>
    )
}

export default ResetPassword;