import { Button, FileInput, LoadingOverlay, NumberInput, rem, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm=()=>{
     
    const {id} = useParams();
    const user = useSelector((state:any)=>state.user)
    const [preview,setPreview] = useState(false);
    const [submit,setSubmit]=useState(false);
    const [sec,setSec]=useState(5);
    const navigate = useNavigate();


    const handlePreview =()=>{
        form.validate();
        window.scrollTo({top:0,behavior:'smooth'})
        if(!form.isValid())return;
        setPreview(!preview);
    }
    
    const handleSubmit = async()=>{
       setSubmit(true);
       let resume:any = await getBase64(form.getValues().resume);
       let applicant = {...form.getValues(), applicantId:user.id ,resume:resume.split(',')[1]};
       applyJob(id,applicant).then((res)=>{
        setSubmit(false);
        successNotification("Success","Application Submitted ");
        navigate("/job-history");
       }).catch((err)=>{
        setSubmit(false);
        errorNotification("Error",err.response.data.errorMessage);
       })
    };

    const form = useForm({
          mode:'controlled',
          validateInputOnChange:true,
        initialValues: {
          name: '',
          email: '',
          phone:'',
          website:'',
          resume: null,
          coverLetter:'',
          
        },
    
        validate:{
          name:isNotEmpty ('name is required'),
          email: isNotEmpty ('email is required'),
          phone: isNotEmpty ('Phone Number is required'),
          website: isNotEmpty ('Website is required'),
          resume:isNotEmpty (' Resume is required'),
         
        }
      });
    
    return(
        <>
        <LoadingOverlay className="!fixed "
          visible={submit}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
        />
        <div className="text-xl font-semibold mb-5">Submit Your Application</div>
         <div className="flex flex-col gap-5">
            <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
                <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}}`} label="Full name" withAsterisk placeholder="Enter name" />
                <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}}`} label="Email" withAsterisk placeholder="Enter email" />
            </div>
             <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
                <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}}`} label="Phone Number" withAsterisk placeholder="Phone Number" hideControls min={0} max={9999999999} clampBehavior="strict"/>
                <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}}`} label="Personal Website" withAsterisk placeholder="Enter URL" />
                 </div>
                <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}}`} withAsterisk leftSection={<IconPaperclip stroke={1.5}/>} label="Attach your CV" placeholder="Your CV" leftSectionPointerEvents="none"/>
                 <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}}`}
                 withAsterisk
                    label="Cover Letter"
                    placeholder="Type something about yourself..."
                    minRows={4} autosize
                    />
           {!preview && <Button  onClick={handlePreview} color="bright-sun.4" variant="light" >
                         Preview
                       </Button>}
                       {
                        preview && <div className="flex gap-10 [&>*]:w-1/2">
                            <Button  onClick={handlePreview} color="bright-sun.4" fullWidth variant="outline" >
                         Edit
                       </Button>
                       <Button  onClick={handleSubmit} color="bright-sun.4" variant="light" fullWidth >
                         Submit
                       </Button>
                        </div>
                       }
         </div>
        </>
    )
}
export default ApplicationForm;