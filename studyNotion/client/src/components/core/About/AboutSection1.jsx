import React from "react";
import about1 from "../../../assets/Images/aboutus1.webp";
import about2 from "../../../assets/Images/aboutus2.webp";
import about3 from "../../../assets/Images/aboutus3.webp";
import HighlightText from "../../common/HighlightText";

const AboutSection1 = () => {
  return (
    <div className="w-full bg-richblack-800 overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="w-11/12 mx-auto text-white pt-6 sm:pt-10 lg:pt-14 font-inter relative flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/*---------- Heading Section --------- */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight tracking-wide">
            Driving Innovation in Online Education for a
            <br className="hidden sm:block" />
            <HighlightText text="Brighter Future" />
          </h3>
          
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-richblack-300 text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-0">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>

        {/*---------- Image Gallery --------- */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10">
          {[about1, about2, about3].map((item, index) => (
            <div key={index} className="w-full sm:w-1/3 h-auto overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                className="w-full h-auto object-cover"
                src={item} 
                alt={`About us ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/*---------- Bottom Text --------- */}
        <div className="mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-6 lg:px-10">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-center leading-normal sm:leading-relaxed">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform <HighlightText text="combines technology" />,
            <span className="text-orange-300"> expertise</span>, and community to
            create an{' '}
            <span className="text-yellow-300">
              unparalleled educational experience
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection1;