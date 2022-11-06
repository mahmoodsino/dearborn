import Image from "next/image";
import React from "react";
import logo_b from "../../../../public/assets/images/logo-b.png";
import logo_b_ar from "../../../../public/assets/images/logo-ar-b.png";
import { PopularCard } from "../../home/elemnts";
import SocialMedia from "./SocialMedia";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {  AboutUsAtom,  MostPupularAtom } from "../../../../helper";
import HtmlParser from "react-html-parser";

const MainSections = () => {
  const [mostPopular, setMostPopular] = useRecoilState(MostPupularAtom);
  const { locale } = useRouter();
  const [aboutUs, setAboutUs] = useRecoilState(AboutUsAtom)


  return (
    <div className="mt-[150px]  px-2">
        <div>
          {locale === "en" ? (
            <div className="flex justify-center">
              <Image src={logo_b} />
            </div>
          ) : (
            <div className="flex justify-center">
              <Image src={logo_b_ar} />
            </div>
          )}
          <div className="flex mt-4 mb-10 justify-center gap-3">
            <iframe
              className="border w-[450px]  h-[320px] mt-2"
              src={aboutUs.left_youtube_link}
              title="description"
            ></iframe>
            <iframe
              className="border w-[450px]  h-[320px]  mt-2"
              src={aboutUs.right_youtube_link}
              title="description"
            ></iframe>
          </div>

          <div>
            <h5 className="text-[17px] font-bold text-gray2">
              {HtmlParser(aboutUs.top_text)}
            </h5>
            <SocialMedia />
            <h5 className="text-[17px] font-bold text-gray2">
              {HtmlParser(aboutUs.bottom_text)}
            </h5>
            <div className="py-5 mb-10">
              <div className="flex justify-between border-b-2 border-b-primary">
                <div></div>
                <button className="bg-primary text-white font-medium px-4 py-3 ">
                  {locale === "en" ? (
                    <span>MOST POPULAR</span>
                  ) : (
                    <span className="font-bold">الأكثر تداولاً</span>
                  )}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-5 text-left">
                {mostPopular.map((item, i) => {
                  return <PopularCard key={i} post={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default MainSections;
