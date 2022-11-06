import React, { useEffect } from "react";
import LatestNews from "./LatestNews";
import HomeSlider from "./Slider";
import TodayPicks from "./TodayPicks";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import MostPupular from "./MostPupular";
import ExclusiveReports from "./ExclusiveReports";
import { Spinner } from "../../../spinner";

const MainSection = () => {

 
  return (
    <div className="">
      <HomeSlider />
      <LatestNews />
      <TodayPicks />
      <SocialMedia />
      <MostPupular />
      <ExclusiveReports />
      
    </div>
  );
};

export default MainSection;
