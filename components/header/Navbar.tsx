import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logo from "../../public/assets/images/logo.png";
import {
  BurgerIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubIcon,
} from "../icons";
import Categories from "./Categories";
import logo_ar from "../../public/assets/images/logo-ar.png";
import UsaIcon from "../icons/UsaIcon";
import LbnIcon from "../icons/LbnIcon";
import { AboutUsAtom, getWether, OpenSidebarAtom } from "../../helper";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { Spinner } from "../spinner";

interface props {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: [{ id: number; main: string; description: string; icon: string }];
  wind: { speed: number; deg: number };
}

const Navbar = () => {
  const { pathname } = useRouter();
  let { locale } = useRouter();
  const [openSidebar, setOpenSidebar] = useRecoilState(OpenSidebarAtom);
  const [wether, setWeather] = useState<props>({} as props);
  const [loading, setLoading] = useState(false);
  const [aboutUs, setAboutUs] = useRecoilState(AboutUsAtom);

  let Home = locale === "en" ? "Home" : "الرئيسيه";
  let Exclusive = locale === "en" ? "Exclusive" : "حصري";
  let about = locale === "en" ? "About" : "حولنا";

  const routse = [
    { path: "/", name: Home },
    { path: "/exlusive", name: `[${Exclusive}]` },
    { path: "/about", name: about },
  ];
  const changelang = () => {
    if (locale === "en") {
      window.location.href = "/ar";
    } else {
      window.location.href = "/en";
    }
  };

  useEffect(() => {
    if (locale === "en") {
      document.dir = "ltr";
    } else {
      document.dir = "rtl";
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getWether();
      if (res === null) {
        console.log(res);

        toast.error("some thing went wrong");
      } else {
        setWeather(res);
        // setWeather(res.main.temp * 1.8 + 32);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="whitespace-nowrap fixed w-full top-0 z-[100] h-[129px] ">
      <div className="bg-primary ">
        <div className="2xl:container mx-auto md:px-3 xl:px-40 2xl:px-56 flex items-center justify-between  text-white">
          <div className="flex  items-center  ">
            <button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="md:hidden sm:block mr-2"
            >
              <BurgerIcon className="w-10" />
            </button>
            {locale === "en" ? (
              <Link href="/">
                <a className="pr-3">
                  <Image height={50} width={210} src={logo} alt="" />
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a className="ml-5">
                  <Image height={50} width={196} src={logo_ar} alt="" />
                </a>
              </Link>
            )}
            {routse.map((router, i) => {
              return (
                <Link key={i} href={router.path}>
                  <a
                    className={`font-bold text-[13px] px-4 py-6 sm:hidden md:block ${
                      pathname.slice(1) !== router.path.slice(1)
                        ? "text-white"
                        : "text-secoundary border-b-4 border-b-secoundary"
                    }`}
                  >
                    {router.name}
                  </a>
                </Link>
              );
            })}
            <Link href="/live">
              <a className="font-bold text-[13px] sm:hidden ml-2  py-6   md:flex md:items-center md:justify-around  ">
                <span
                  className={`redspan rounded-full mr-3  h-fit w-fit block ${
                    locale === "ar" && "ml-3"
                  }`}
                ></span>
                {locale === "en" ? "Live" : "بث مباشر"}
              </a>
            </Link>
          </div>
          <div
            className={` flex mr3 ${
              locale === "en" && "space-x-5"
            }  items-center `}
          >
            {!loading ? (
              <span
                className={`text-sm sm:mr-5  flex space-x-1 items-center ${
                  locale === "en" ? " md:mr-5" : "md:ml-7"
                }   lg:w-[95.5px] ml-4 ${locale === "ar" && "ml-5"}`}
              >
                <span className="sm:hidden md:block">Dearborn</span>
                <span>{(wether?.main?.temp * 1.8 + 32).toFixed()} °F</span>
                {wether.weather && (
                  <img
                    className="w-8"
                    src={`https://openweathermap.org/img/w/${wether?.weather[0]?.icon}.png`}
                    alt=""
                  />
                )}
              </span>
            ) : (
              <div className="left-0 right-0 w-[95.5px] ml-4 mx-auto">
                <Spinner className="w-10" />
              </div>
            )}
            {/* <button
              onClick={() => changelang()}
              className={`   rounded-full px-4 pb-2 bg-white/20 sm:hidden md:block `}
            > */}
            {locale === "en" ? (
              <Link href="/ar">
                <a
                  onClick={() => changelang()}
                  className="rounded-full px-4 pb-2 bg-white/20 sm:hidden md:block"
                >
                  <span className="text-[15px] font-bold flex items-center ">
                    عربي <LbnIcon />
                  </span>
                </a>
              </Link>
            ) : (
              <Link href="">
                <a
                  onClick={() => changelang()}
                  className="rounded-full px-4 pb-2 bg-white/20 sm:hidden md:block"
                >
                  <span className="flex space-x-2 items-center font-medium mt-1">
                    English <UsaIcon />
                  </span>
                </a>
              </Link>
            )}
            {/* </button> */}
            <div className=" space-x-3 sm:hidden lg:flex ">
              <Link href={aboutUs.facebook_link}>
                <a
                  target="_blank"
                  className={`bg-white/20 rounded-full  px-2 py-2 ${
                    locale === "ar" && "mx-3"
                  }`}
                >
                  <FacebookIcon className="w-5 mt-[1px]" />
                </a>
              </Link>
              <Link href={aboutUs.twitter_link}>
                <a
                  target="_blank"
                  className="bg-white/20 rounded-full px-2 py-2"
                >
                  <TwitterIcon className="w-5 mt-0.5" />
                </a>
              </Link>
              <Link href={aboutUs.instagram_link}>
                <a
                  target="_blank"
                  className="bg-white/20 rounded-full px-2 py-2"
                >
                  <InstagramIcon className="w-5 mt-0.5" />
                </a>
              </Link>
              <Link href={aboutUs.youtube_link}>
                <a
                  target="_blank"
                  className="bg-white/20 rounded-full px-2 py-2"
                >
                  <YoutubIcon className="w-5 mt-0.5" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
