
import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const CertiInput = (props: any) => {
const select = fields;
const profile = useSelector((state:any)=>state.profile);
const dispatch = useDispatch();


const form = useForm({
      mode:'controlled',
      validateInputOnChange:true,
    initialValues: {
      name: '',
      issuer: '',
      issueDate:new Date(),
      certificateId: '',
      
    },

    validate:{
      name:isNotEmpty ('name is required'),
      issuer: isNotEmpty ('Issuer is required'),
      issueDate: isNotEmpty ('Issue Date is required'),
      certificateId:isNotEmpty ('Certificate ID is required')
    }
  });

  // By Sir's Video 
  // const handleSave=()=>{
  //   form.validate();
  //   if(!form.isValid())return;
  //   let certi=[profile.certifications];
  //   certi.push(form.getValues());
  //   certi[certi.length-1].issueDate=certi[certi.length-1].issueDate.toISOString();
  //   let updatedProfile = {...profile,certifications:certi};
  //   props.setEdit(false);
  //    dispatch(changeProfile(updatedProfile));
  //    successNotification("Success","Certificate Added Successfully");
  // }

  // By chatGPT 
  const handleSave = () => {
  const isValid = form.validate();
  if (!isValid) return;

  const values = form.getValues();
  const issueDate = new Date(values.issueDate);
  const certi = [...(profile.certifications || [])];

  certi.push({ ...values, issueDate: issueDate.toISOString() });

  const updatedProfile = { ...profile, certifications: certi };

  props.setEdit(false);
  dispatch(changeProfile(updatedProfile));
  successNotification("Success", "Certificate Added Successfully");
};

return(
        <>
            <div className="flex flex-col gap-3">
                    <div className="text-lg font-semibold">Add Certificate</div>
                    <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
                    <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="enter title"/>
    <SelectInput form={form} name='issuer' {...select[1]}/>
        </div>

        <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
                    <MonthPickerInput {...form.getInputProps("issueDate")}
            withAsterisk
            maxDate={new Date()}
            label="Issue date"
            placeholder="Pick date"
          
          />
          <TextInput label="Certificate ID"withAsterisk placeholder="Enter ID" {...form.getInputProps('certificateId')}/>
        </div>
         <div className="flex gap-5">
                              <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
                              <Button onClick={()=> props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
                            </div>
            </div>

    </>
  )
};
export default CertiInput;
