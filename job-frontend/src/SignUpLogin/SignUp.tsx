import {Anchor,Button,Checkbox,Group,LoadingOverlay,PasswordInput,Radio,TextInput,} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FromValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const SignUp = () => {
  const [data, setData] = useState<{[key:string]:string}>(form);
  const [formError, setFormError] = useState<{[key:string]:string}>(form);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleChange = (event: any) => {

    if (typeof event == "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name,
      value = event.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });

    if(name === "password" && data.confirmPassword !== ""){
        let err = "";
        if(data.confirmPassword !== value) err = "Password do not match"
        setFormError({ ...formError, [name]: signupValidation(name, value),confirmPassword:err });
    }
    if(name === "confirmPassword"){
        if(data.password !== value) setFormError({...formError,[name]:"Password do not match"});
        else setFormError({...formError,confirmPassword:""})
    }
  };

  const handleSubmit = () => {
    
    let valid = true,newFormError:{[key:string]:string}={};
    for (let key in data){
        if(key === "accountType")continue;
        if(key !== "confirmPassword") newFormError[key]= signupValidation(key,data[key]);
        else if(data[key] !== data["password"])newFormError[key]="Passwords do not match."
        if(newFormError[key]) valid=false;
    }
    setFormError(newFormError);

    if(valid === true){
      setLoading(true);
            registerUser(data)
          .then((res) => {
            console.log(res);
            setData(form);
             notifications.show({
          title: 'Registered Successfully',
          message: 'Redirecting to login Page...',
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%", height:"90%"}}/>,
          color:"teal",
          withBorder:true,
          className:"!border-green-500",
        })
        setTimeout(()=>{
          setLoading(false);
                 navigate("/login");
        },4000)
          })
          .catch((err) => {
            setLoading(false);
            console.log(err)
             notifications.show({
          title: 'Registered Failed',
          // message: err.response.data.errorMessage,
          message: err?.response?.data?.errorMessage || "Something went wrong. Please try again.",
          withCloseButton:true,
          icon:<IconX style={{width:"90%", height:"90%"}}/>,
          color:"red",
          withBorder:true,
          className:"!border-red-500",
        })
        });
          
      };
    }
  return (
    <>
    <LoadingOverlay className="translate-x-1/2"
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
              loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
            />
      <div className="w-1/2 sm-mx:w-full sm-mx:py-20 px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3 mt-16">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput
          value={data.name}
          error={formError.name}
          onChange={handleChange}
          name="name"
          withAsterisk
          label="Full Name"
          placeholder="Your Name"
        />
        <TextInput
          value={data.email}
          error={formError.email}
          onChange={handleChange}
          name="email"
          withAsterisk
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
        />
        <PasswordInput
          value={data.password}
          error={formError.password}
          onChange={handleChange}
          name="password"
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
        />
        <PasswordInput
          value={data.confirmPassword}
          error={formError.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Confirm Password"
          placeholder="Confirm Password"
        />

        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          name="favoriteFramework"
          label="You are?"
          withAsterisk
        >
          <div className="flex gap-6 xs-mx:gap-3">
            <Radio
              className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 border hover:bg-mine-shafy-900 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400"
              autoContrast
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 border hover:bg-mine-shafy-900 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400"
              autoContrast
              value="EMPLOYER"
              label="Employer"
            />
          </div>
        </Radio.Group>
        <Checkbox
          autoContrast
          label={
            <>
              I accept {""}
              <Anchor>terms & conditions</Anchor>
            </>
          }
        />
        <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">
          Sign up
        </Button>
        <div className="text-center sm-mx:text-sm xs-mx-text-xs">
          Have an Account?
          <span onClick={()=> {navigate("/login"); setFormError(form); setData(form)}} className="sm-mx:text-sm xs-mx-text-xs text-bright-sun-400 hover:underline cursor-pointer">
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
