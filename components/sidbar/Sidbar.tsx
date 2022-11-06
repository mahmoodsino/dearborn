import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { OpenSidebarAtom } from "../../helper";
import { CloseIcon } from "../icons";
import logo from "../../public/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import LbnIcon from "../icons/LbnIcon";
import UsaIcon from "../icons/UsaIcon";
import logo_ar from "../../public/assets/images/logo-ar.png";

const Sidbar = () => {
  const [openSidebar, setOpenSidebar] = useRecoilState(OpenSidebarAtom);
  const { locale } = useRouter();

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

  return (
    <div>
      <>
        <div
          className={` ${
            openSidebar ? "left-0 " : "-left-full"
          } top-0 left-0 w-[63vw] shadow-2xl border-transparent bg-white z-[110] fixed h-[100vh] overflow-y-auto transition-all duration-300 ease-in-out`}
        >
          <div className="bg-primary">
            <div className={`flex  ${locale=== "en" ? "justify-end" : "justify-start"}`} >
              <button
                onClick={() => setOpenSidebar(false)}
                className=" mt-5 pl-5"
              >
                <CloseIcon className="w-7  text-[#f55]" />
              </button>
            </div>
            <div className="flex justify-center pb-3">
              {locale === "en" ? (
                <Link href="/">
                  <a className="pr-3">
                    <Image height={40} width={160} src={logo} alt="" />
                  </a>
                </Link>
              ) : (
                <Link href="/">
                  <a className="ml-5">
                    <Image height={40} width={176} src={logo_ar} alt="" />
                  </a>
                </Link>
              )}
            </div>
          </div>

          <div
            onClick={() => setOpenSidebar(false)}
            className={`ml-5 mt-5 space-y-3 text-[#222] ${
              locale === "ar" && "mr-10"
            }`}
          >
            <Link href="/">
              <a className="text-[17px] block">
                {locale === "en" ? (
                  <span>Home</span>
                ) : (
                  <span className="font-bold text-lg">الرئيسية</span>
                )}
              </a>
            </Link>
            <Link href="/exlusive">
              <a className="text-[17px] block">
                {locale === "en" ? (
                  <span>[Exclusive]</span>
                ) : (
                  <span className="font-bold text-lg">[حصري]</span>
                )}
              </a>
            </Link>
            <Link href="/about">
              <a className="text-[17px] block">
                {locale === "en" ? (
                  <span>about</span>
                ) : (
                  <span className="font-bold text-lg">حولنا</span>
                )}
              </a>
            </Link>
            <Link href="/live">
              <a className="text-[17px] block">
                {locale === "en" ? (
                  <span>Live</span>
                ) : (
                  <span className="font-bold text-lg">بث مباشر</span>
                )}
              </a>
            </Link>
          </div>
          <button
            onClick={() => changelang()}
            className={` px-3 pb-2 mt-3 text-black bg-white/20 ${
              locale === "ar" && "mr-8"
            } `}
          >
            {locale === "en" ? (
              <span className="text-xl font-bold flex items-center ">
                <LbnIcon />
                <span className="block ml-2">عربي</span>
              </span>
            ) : (
              <span className="flex space-x-2 items-center font-medium">
                English <UsaIcon />
              </span>
            )}
          </button>
        </div>
      </>
    </div>
  );
};

export default Sidbar;
