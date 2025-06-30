import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees=({companyName} : {companyName:string})=>{
    return (
        <>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  gap-6 px-4">
                {
                    talents.map((talent,index)=>index<6 &&<TalentCard key={index} {...talent}/>)
                }
           
            </div>
        </>
    )
}

export default CompanyEmployees;