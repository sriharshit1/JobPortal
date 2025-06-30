import React, { useState } from "react";
import { Button, Collapse, Divider, RangeSlider, Slider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery('(max-width: 475px)');
  const [opened, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState<[number, number]>([0, 300]);
   const dispatch = useDispatch();
  
  const handleChange=( event:any)=>{
    dispatch(updateFilter({salary:event}));

  }


  return (
    <div>
      <div className="flex justify-end">

      {matches&& <Button m="sm" radius="lg" className="align" onClick={toggle} variant="outline" autoContrast color="brigt-sun-400 ">{opened?"Close":"Filters"}</Button>}
      </div>
    <Collapse in={!matches || opened}>
    <div className="lg-mx:!flex-wrap flex px-5 py-8 items-center !text-mine-shaft-100">
      {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          
          <div  className="w-1/5 lg-mx:w-1/4 lg-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
            <MultiInput {...item} />
          </div>
          <Divider className="sm-mx:hidden" mr="xs" size="sm" orientation="vertical" />
        </React.Fragment>
      ))}
      <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 lg-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>
            &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
          </div>
        </div>
        <RangeSlider
          onChangeEnd={handleChange}
          color="bright-sun.4"
          size="xs"
          value={value}
          minRange={1}
          onChange={setValue}
        />
      </div>
    </div>
    </Collapse>
    </div>
  );
};

export default SearchBar;


