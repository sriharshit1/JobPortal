import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";


const CompanyPage=()=>{

    const navigate = useNavigate();
    return(
        <>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
          <Divider size="xs"/>
            <Button my="md" onClick={()=> navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" variant="light" >
              Back
            </Button>
    
          <div className="flex w-full gap-5 px-5 justify-around">
        <Company/>
        <SimilarCompanies/>
          </div>
        </div>
        </>
    )
}

export default CompanyPage;