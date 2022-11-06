import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import {
  AboutUsAtom,
  countFacebookAtom,
  countInstaAtom,
  countTwitterAtom,
  countYoutubeAtom,
  LoadingFacebookAtom,
  LoadingInstaAtom,
  LoadingYoutubeAtom,
} from "../../../../helper";
import logo3 from "../../../../public/assets/images/logo3.jpg";
import { ThumbUp } from "../../../icons";
import { Spinner } from "../../../spinner";

const SocialMedia = () => {
  const [aboutUs, setAboutUs] = useRecoilState(AboutUsAtom);
  const [faceBook, SetFacebook] = useRecoilState(countFacebookAtom);
  const [insta, SetInsta] = useRecoilState(countInstaAtom);
  const [youTube, SetYoutube] = useRecoilState(countYoutubeAtom);
  const [titter, SetTwitter] = useRecoilState(countTwitterAtom);

  const [laodingFA, setLoadingFA] = useRecoilState(LoadingFacebookAtom);
  const [laodingYT, setLoadingYT] = useRecoilState(LoadingYoutubeAtom);
  const [laodingIN, setLoadingIN] = useRecoilState(LoadingInstaAtom);

  return (
    <div className="grid md:grid-cols-3 my-10 text-left gap-5">
      <div className="">
        <span className="block text-[#036ed9] text-lg font-bold">Facebook</span>
        <Link href={aboutUs.facebook_link}>
          <a target="_blank" className="border mt-3 py-2 border-[#036ed9] flex md:flex-col lg:flex-row justify-between items-center px-5">
            <div className="flex lg:flex-row md:flex-col items-center">
              <div className="">
                <Image height={50} width={50} src={logo3} />
              </div>
              <div className="lg:py-3 px-2 felx flex-col lg:text-left  md:text-center justify-center">
                <span className="block text-lg font-semibold">
                  @Dearborn.org
                </span>
                <div className="flex items-center ">
                  {!laodingFA ? (
                    <span className="text-lg font-semibold">{faceBook}</span>
                  ) : (
                    <span>
                      <Spinner className="w-7" />
                    </span>
                  )}
                  <span>likes</span>
                </div>
              </div>
            </div>
            <ThumbUp className="w-10 text-[#036ed9]" />
          </a>
        </Link>
      </div>

      <div className="">
        <span className="block text-[#fc1111] text-lg font-bold">Youtube</span>
        <Link href={aboutUs.youtube_link}>
          <a target="_blank" className="border mt-3 py-2 border-[#fc1111]  flex md:flex-col lg:flex-row justify-between items-center px-5">
            <div className="flex lg:flex-row md:flex-col items-center">
              <div className="">
                <Image height={50} width={50} src={logo3} />
              </div>
              <div className="lg:py-3 px-2 whitespace-nowrap felx flex-col lg:text-left  md:text-center justify-center">
                <span className="block text-lg font-semibold">
                  @Dearborn.org
                </span>
                <div className="flex items-center">
                {!laodingYT ?
                 <span className="text-lg font-semibold">{youTube}</span>
                 :
                 <span>
                  <Spinner className="w-7" />
                 </span>
                }
                <span>Subscribers</span>

                </div>
              </div>
            </div>
            <button className="text-white bg-[#fc1111] px-2 py-1 rounded-md">
              Subscribe
            </button>
          </a>
        </Link>
      </div>

      <div className="">
        <span className="block text-skyblue text-lg font-bold">Instagram</span>
        <Link href={aboutUs.instagram_link}>
          <a target="_blank" className="border mt-3 py-2 border-skyblue flex  md:flex-col lg:flex-row justify-between items-center px-5">
            <div className="flex lg:flex-row md:flex-col items-center">
              <div className="">
                <Image height={50} width={50} src={logo3} />
              </div>
              <div className="lg:py-3 px-2 felx flex-col lg:text-left  md:text-center justify-center">
                <span className="block text-lg font-semibold">
                  @Dearborn.org
                </span>
                <div className="flex items-center">
                  {!laodingIN ? 
                  <span className="text-lg font-semibold">{insta}</span>
                  :
                  <span>
                    <Spinner className="w-7" />
                  </span>
                }
                <span>Subscribers</span>

                </div>
              </div>
            </div>
            <span className="text-skyblue text-lg font-semibold">Follow</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
