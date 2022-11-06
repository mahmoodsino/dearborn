import Link from "next/link";
import { useRouter } from "next/router";
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
  LoadingTwitterAtom,
  LoadingYoutubeAtom,
} from "../../../../helper";
import {
  FacebookIcon,
  InstagramIcon,
  ThumbUp,
  TwitterIcon,
  YoutubIcon,
} from "../../../icons";
import { Spinner } from "../../../spinner";

const SocialMedia = () => {
  const { locale } = useRouter();
  const [aboutUs, setAboutUs] = useRecoilState(AboutUsAtom);
  const [faceBook, SetFacebook] = useRecoilState(countFacebookAtom);
  const [insta, SetInsta] = useRecoilState(countInstaAtom);
  const [youTube, SetYoutube] = useRecoilState(countYoutubeAtom);
  const [titter, SetTwitter] = useRecoilState(countTwitterAtom);

  const [laodingFA, setLoadingFA] = useRecoilState(LoadingFacebookAtom);
  const [loadingTW, setLoadingTW] = useRecoilState(LoadingTwitterAtom);
  const [laodingYT, setLoadingYT] = useRecoilState(LoadingYoutubeAtom);
  const [laodingIN, setLoadingIN] = useRecoilState(LoadingInstaAtom);
  
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 px-10 my-10">
      <Link href={aboutUs.facebook_link}>
        <a target="_blank" className="flex flex-col items-center space-y-3">
          <FacebookIcon className="w-20 text-[#036ed9]" />
          {!laodingFA ?
          <h5 className="text-[35px] text-gray2 font-bold">{faceBook}</h5>
         : <Spinner className="w-14" /> 
        }
          <h5>
            {locale === "en" ? (
              "likes"
            ) : (
              <span className="font-bold">اعجابات</span>
            )}
          </h5>
          <ThumbUp className="text-[#036ed9] w-10" />
        </a>
      </Link>
      <Link href={aboutUs.instagram_link}>
        <a target="_blank" className="flex flex-col items-center space-y-3">
          <div className="bg-[#11acff] w-20 h-20 rounded-full flex items-center justify-center">
            <InstagramIcon className="w-10  text-white" />
          </div>
          {!laodingIN ? 
          <h5 className="text-[35px] text-gray2 font-bold">{insta}</h5>
            : <Spinner className="w-14" />
          }
          <h5>
            {locale === "en" ? (
              "Followers"
            ) : (
              <span className="font-bold">متابع</span>
            )}
          </h5>
          <h5 className="text-[#11acff] font-bold">
            {locale === "en" ? (
              "Follow"
            ) : (
              <span className="font-bold">تابعنا</span>
            )}
          </h5>
        </a>
      </Link>
      <Link href={aboutUs.youtube_link}>
        <a target="_blank" className="flex flex-col items-center sm:mt-5  md:mt-0 space-y-3">
          <div className="bg-red1 w-20 h-20 rounded-full flex items-center justify-center">
            <YoutubIcon className="w-10  text-white" />
          </div>
          {!laodingYT ? 
          <h5 className="text-[35px] text-gray2 font-bold">{youTube}</h5>
        :<Spinner className="w-14" />  
        }
          <h5>
            {locale === "en" ? (
              "Subscribers"
            ) : (
              <span className="font-bold">مشترك</span>
            )}
          </h5>
          <button className="text-white bg-red1 px-2 text-lg py-0.5 rounded-md ">
            {locale === "en" ? (
              "Subscribe"
            ) : (
              <span className="font-bold">اشتراك</span>
            )}
          </button>
        </a>
      </Link>
      <Link href={aboutUs.twitter_link}>
        <a target="_blank" className="flex flex-col items-center sm:mt-5  md:mt-0 space-y-3">
          <div className="bg-[#11acff] w-20 h-20 rounded-full flex items-center justify-center">
            <TwitterIcon className="w-20  text-white" />
          </div>
          {!loadingTW ?
          <h5 className="text-[35px] text-gray2 font-bold">{titter}</h5>
        :<Spinner className="w-14" />  
        }
          <h5>
            {locale === "en" ? (
              "Subscribers"
            ) : (
              <span className="font-bold">متابع</span>
            )}
          </h5>
          <h5 className="text-[#11acff] font-bold">
            {locale === "en" ? (
              "Follow"
            ) : (
              <span className="font-bold">تابعنا</span>
            )}
          </h5>
        </a>
      </Link>
    </div>
  );
};

export default SocialMedia;
