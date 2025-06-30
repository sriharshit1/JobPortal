const AboutComp = ({
  overview,
  specialties,
  industry,
  website,
  size,
  headquarters,
}: {
  overview: string;
  specialties: string[];
  industry: string;
  website: string;
  size: string;
  headquarters: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-xl mb-3 font-semibold">Overview</div>
        <div className="text-sm text-mine-shaft-300 text-justify">{overview}</div>
      </div>

      <div>
        <div className="text-xl mb-3 font-semibold">Industry</div>
        <div className="text-sm text-mine-shaft-300 text-justify">{industry}</div>
      </div>

      <div>
        <div className="text-xl mb-3 font-semibold">Size</div>
        <div className="text-sm text-mine-shaft-300 text-justify">{size}</div>
      </div>

      <div>
        <div className="text-xl mb-3 font-semibold">Headquarters</div>
        <div className="text-sm text-mine-shaft-300 text-justify">{headquarters}</div>
      </div>

      <div>
        <div className="text-xl mb-3 font-semibold">Specialties</div>
        <div className="text-sm text-mine-shaft-300 text-justify">
          {specialties.map((item, index) => (
            <span key={index}>• {item} </span>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xl mb-3 font-semibold">Website</div>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-bright-sun-400"
        >
          {website}
        </a>
      </div>
    </div>
  );
};

export default AboutComp;
