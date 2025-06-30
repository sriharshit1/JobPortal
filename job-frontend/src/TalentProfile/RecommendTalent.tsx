import { useParams } from "react-router-dom";
import TalentCard from "../FindTalent/TalentCard";

const RecommendTalent = (props: any) => {
  const { id } = useParams();

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 max-w-md p-2">
      <div className="text-xl font-semibold mb-5">Recommended Talent</div>
      <div className="flex flex-col gap-5">
        {
          props?.talents?.map((talent: any, index: number) =>
            index < 4 && id != talent.id ? (
              <TalentCard key={index} {...talent} />
            ) : null
          )
        }
      </div>
    </div>
  );
};

export default RecommendTalent;
