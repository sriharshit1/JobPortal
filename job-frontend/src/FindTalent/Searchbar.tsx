import React, { useState } from "react";
import { Button, Collapse, Divider, Input, RangeSlider, Slider } from "@mantine/core";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const Searchbar = () => {
   const matches = useMediaQuery('(max-width: 475px)');
    const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name,setName]=useState('');

  const handleChange=(name:any , event:any)=>{
    if(name=="exp") dispatch(updateFilter({exp:event}));
else{
  dispatch(updateFilter({name:event.target.value}))
  setName(event.target.value);
}
  }

  return (
    <div>
          <div className="flex justify-end">
    
          {matches&& <Button m="sm" radius="lg" className="align" onClick={toggle} variant="outline" autoContrast color="brigt-sun-400 ">{opened?"Close":"Filters"}</Button>}
          </div>
        <Collapse in={!matches || opened}>
    <div className="flex px-5 py-8 lg-mx:!flex-wrap items-center !text-mine-shaft-100">
      <div className="w-1/5 lg-mx:w-1/4 lg-mx:w-[30%] sm-mx:w-[48%]  xs-mx:w-full xs-mx:mb-1 flex items-center ">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full mr-2 p-1">
          <IconUserCircle size={20} />
        </div>
        <Input defaultValue={name} onChange={(e)=> handleChange("name",e)} className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name"/>
      </div>
       <Divider className="sm-mx:hidden" mr="xs" size="sm" orientation="vertical" />
      {
      searchFields.map((item, index) => {
        
          return <React.Fragment key={index}><div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 lg-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
            <MultiInput title={item.title} icon={item.icon} options={item.options} />
          </div>
          <Divider className="sm-mx:hidden" mr="xs" size="sm" orientation="vertical" />
          </React.Fragment>
      
})}
      <div style={{ position: "relative", height: "60px" }} className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 lg-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full [&_.mantine-Slider-label]:!translate-y-10 xs-mx:mb-1">
        <div className="flex text-sm justify-between">
          <div>Experience(Years)</div>
          <div>
            {value[0]} - {value[1]}
          </div>
        </div>
        <RangeSlider
        onChangeEnd={(e)=>handleChange("exp",e)}
          color="bright-sun.4"
          size="xs"
          value={value}
          onChange={setValue}
          max={50}
          min={1}
          minRange={1}
        />
      </div>
    </div>
    </Collapse>
    </div>
  );
};

export default Searchbar;
