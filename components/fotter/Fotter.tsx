import React, { useEffect, useState,FormEvent } from "react";
import { SmallCard } from "../layouts/home/elemnts";
import logo from "../../public/assets/images/logo.png";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubIcon } from "../icons";
import { useRouter } from "next/router";
import logo_ar from "../../public/assets/images/logo-ar.png";
import { useRecoilState } from "recoil";
import {
  AboutUsAtom,
  CategoriesAtom,
  CategoriesType,
  getMostRead,
  handelSubscribe,
  MostReadAtom,
} from "../../helper";
import { toast } from "react-toastify";
import Link from "next/link";
import { selectedCAtegoryAtom } from "../header/Categories";
import { Spinner } from "../spinner";
import logo_bint from "../../public/assets/images/logo_bint.png";

const appName =process.env.NEXT_PUBLIC_WEPSITE_NAME


const Fotter = () => {
  const { locale } = useRouter();
  const [categories, setCategories] = useRecoilState(CategoriesAtom);
  const [mostRead, setMostRead] = useRecoilState(MostReadAtom);
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(selectedCAtegoryAtom);
  const push = useRouter().push;
  const [aboutUs, setAboutUs] = useRecoilState(AboutUsAtom);
  const [email, setEmail] = useState("");
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const getData = async () => {
      const res = await getMostRead();
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setMostRead(res.result.posts);
      }
    };
    getData();
  }, []);

  const handelCategory = (category: CategoriesType) => {
    setSelectedCategory(category);
    localStorage.setItem("categry", JSON.stringify(category));
    push({
      pathname: "/category",
      query: { category: encodeURI(category.slug) },
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true)
    event.preventDefault()
    const res = await handelSubscribe(email);
    if(res ===null){
      setLoading(false)
      toast.error("some thing went wrong")
    }else{
      setLoading(false)
      toast.success("Success")
    }
  };

  return (
    <div className="bg-primary">
      <div className="2xl:container xl:px-40 sm:px-5 2xl:px-60 mx-auto">
        <div className="grid grid-cols-6 gap-4 py-10 border-b-4 border-b-white/10">
          <div className="md:col-span-4 sm:col-span-6 ">
            {locale === "en" ? (
              <span className="text-white text-lg font-bold">
                MOST READ NEWS
              </span>
            ) : (
              <span className="text-white text-lg font-bold">الأكثر قراءة</span>
            )}
            <div className="grid lg:grid-cols-2 gap-5 pt-5">
              {mostRead.map((item, i) => {
                return <SmallCard key={i} textWhite="text-white" post={item} />;
              })}
            </div>
          </div>
          <div
            className={`${
              locale === "en" ? "ml-10" : "mr-20"
            }   col-span-2 sm:hidden md:block `}
          >
            {locale === "en" ? (
              <span className="text-white text-lg font-bold">
                ALL CATEGORIES
              </span>
            ) : (
              <span className="text-white text-lg font-bold">
                تصنيفات الأخبار
              </span>
            )}
            <div className="space-y-4 mt-4">
              {categories.map((category, i) => {
                return (
                  <button
                    onClick={() => handelCategory(category)}
                    key={i}
                    className="block text font-semibold uppercase text-white"
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto py-5 border-b-4 border-b-white/10">
          {locale === "en" ? (
            <span className="text-lg block text-center text-white font-medium">
              Subscribe to our newsletter
            </span>
          ) : (
            <span className="text-lg block text-center text-white font-medium">
              اشترك في نشرتنا الإخبارية
            </span>
          )}
          <div className="">
            <form onSubmit={handleSubmit} className="flex justify-center items-center mt-5">
              <input
              required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" h-[55px] sm:w-[98%] md:w-[40%] outline-none px-5 "
                type="email"
                placeholder={`${
                  locale === "en"
                    ? "Enter your email address"
                    : "أدخل عنوان بريدك الالكتروني"
                } `}
              />
              {locale === "en" ? (
                <div>
                  {!loading ?
                <button
                type="submit"
                  className="h-[55px]  text-white px-4 bg-[#012241] hover:bg-secoundary duration-300 hover:text-primary font-medium"
                >
                  Subscribe
                </button>
                :<Spinner className="w-14" />
                  }
                </div>
              ) : (
                <div>
                  {!loading ?
                <button
                type="submit"
                  className="h-[55px] text-white px-4 bg-[#012241] hover:bg-secoundary duration-300 hover:text-primary font-medium"
                >
                  اشتراك
                </button> : 
                <Spinner className="w-14" />
                  }
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="py-8 sm:flex sm:flex-col sm:justify-center sm:items-center md:grid md:grid-cols-4">
          {locale === "en" ? (
            appName === "dearborn" ?
            <div>
              <Image height={50} width={196} src={logo} alt="" />
            </div> :
            <div>
            <Image height={60} width={196} src={logo_bint} alt="" />
          </div> 
          ) : (
            appName ==="dearborn" ? 

            <div>
              <Image height={50} width={196} src={logo_ar} alt="" />
            </div>:
            <div>
            <Image height={60} width={196} src={logo_bint} alt="" />
          </div>
          )}
          <div
            className={`${
              locale === "en" ? "text-left" : "text-right"
            } col-span-2 px-3 py-5`}
          >
            {locale === "en" ? (
              <span className="block text-lg sm:text-center md:text-left font-bold text-white">
                ABOUT US
              </span>
            ) : (
              <span className="block text-lg font-bold text-white">من نحن</span>
            )}
            <span className="text-lg text-white font-semibold">
              {aboutUs.footer_text}
            </span>
          </div>
          <div>
            {locale === "en" ? (
              <span className="text-lg font-bold sm:text-center md:text-left text-white block">
                FOLLOW US
              </span>
            ) : (
              <span className="text-lg font-bold text-white block">تابعنا</span>
            )}
            <div className="space-x-2 flex">
              <Link href={aboutUs.facebook_link}>
                <a
                target="_blank"
                  className={`w-[45px] h-[45px] flex items-center justify-center bg-white/10 ${
                    locale === "ar" && "ml-2"
                  }`}
                >
                  <FacebookIcon className="w-6 text-white" />
                </a>
              </Link>
              <Link href={aboutUs.instagram_link}>
                <a target="_blank" className="w-[45px] h-[45px] flex items-center justify-center bg-white/10">
                  <InstagramIcon className="w-6 text-white" />
                </a>
              </Link>
              <Link href={aboutUs.twitter_link}>
                <a target="_blank" className="w-[45px] h-[45px] flex items-center justify-center bg-white/10">
                  <TwitterIcon className="w-8 text-white" />
                </a>
              </Link>
              <Link href={aboutUs.youtube_link}>
                <a target="_blank" className="w-[45px] h-[45px] flex items-center justify-center bg-white/10">
                  <YoutubIcon className="w-6 text-white" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
