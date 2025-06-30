import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const ExpCard = (props: any) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
const profile = useSelector((state:any)=>state.profile);

  const handleDelete=()=>{
      let exp=[...profile.experiences];
      exp.splice(props.index,1);
      let updatedProfile={...profile,experiences:exp};
      dispatch(changeProfile(updatedProfile));
      successNotification("Success","Experience Deleted Successflly");
  }

  return (
    <>
      { !edit ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex gap-2 items-center">
              <div className="p-2 bg-mine-shaft-800 rounded-md">
                <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">{props.title}</div>
                <div className="text-sm text-mine-shaft-300">
                  {props.company} &bull; {props.location}
                </div>
              </div>
            </div>
            <div className="text-sm text-mine-shaft-300 ">
              {formatDate(props.startDate)} - {props.working?"Present":formatDate(props.endDate)}
            </div>
          </div>
          <div className="text-sm text-mine-shaft-300 text-justify sm-mx:text-xs">
            {props.description}
          </div>
          {props.edit && (
            <div className="flex gap-5">
              <Button onClick={() => setEdit(true)} color="bright-sun.4" variant="outline">Edit</Button>
              <Button onClick={handleDelete} color="red.8" variant="outline">Delete</Button>
            </div>
          )}
        </div>
      ) : (
        <ExpInput {...props} setEdit={setEdit} />
      )}
    </>
  );
};

export default ExpCard;
