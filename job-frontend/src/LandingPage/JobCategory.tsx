import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Category } from "tabler-icons-react";
import { jobCategory } from "../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategroy = () => {
  return (
    <>
      <div className="mt-20 pb-5">
        <div className="text-4xl font-semibold text-center text-mine-shaft-100 md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-3">
          Browse <span className="text-bright-sun-400">Job</span> Category
        </div>

        <div className="text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-mine-shaft-300 text-center w-1/2 sm-mx:w-11/12">
          Expore diverse job opportunities tailored to you skills . Start your
          career journey today.
        </div>
        <Carousel
          slideSize="22%"
      slideGap="md"
      emblaOptions={{
        loop: true,
        dragFree: true,
        align: 'start'
      }}
        className="[&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"

           nextControlIcon={<IconArrowRight className="h-8 w-8"/>}
      previousControlIcon={<IconArrowLeft  className="h-8 w-8" />}
        >
            {jobCategory.map((Category,index)=> <CarouselSlide key={Category.name || index}>
                <div className="flex flex-col items-center w-64 sm-mx:w-56 xs-mx:w-48 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300">
          <div className="bg-bright-sun-300 rounded-full p-2 ">
            <img className="h-8 w-8 sm-mx:h-6 sm-mx:w-6 xs-mx:h-4 xs-mx:w-4" src={`/Category/${Category.name}.png`} alt={Category.name} />
          </div>
          <div className="text-mine-shaft-300 text-xl sm-mx:text-lg xs-mx:text-base font-semibold">
            {Category.name}
          </div>
          <div className="text-mine-shaft-300 text-sm xs-mx:text-xs text-center">
            {Category.desc}
          </div>
          <div className="text-bright-sun-300 text-bg sm-mx:text-lg xs-mx:text-sm sm-mx:text-base ">{Category.jobs}+ new job posted</div>
        </div>
            </CarouselSlide>)
            }
          
        </Carousel>
        
      </div>
    </>
  );
};

export default JobCategroy;
