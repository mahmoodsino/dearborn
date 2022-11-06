import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { getHomeSlider, HomeSliderAtom } from "../../../../helper";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { Spinner } from "../../../spinner";

const HomeSlider = () => {
  const [homeSlider, setHomeSlider] = useRecoilState(HomeSliderAtom);
  const [loading, setLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 1,
    rows: 1,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "button__bar",
  };


  useEffect(() => {
    const getData = async () => {
      const res = await getHomeSlider();
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setHomeSlider(res.result.home_sliders);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="lg:container mt-[150px] ">
          <Slider {...settings}>
            {homeSlider.map((slider, i) => {
              return (
                <div key={i}>
                  <div className="grid md:grid-cols-2 gap-2 px-0.5">
                    {slider.items.map((item) => {
                      if (item.position === "l") {
                        return (
                          <Link href={`/preview?post=${item.post?.slug}`}>
                            <a
                              key={item.post?.id}
                              className="md:h-[500px]  sm:h-[244px] relative news-item-1 "
                            >
                              <div className="absolute bg-black/40 w-full h-full z-40"></div>
                              <img
                                className=" absolute  h-[100%] w-[100%]  "
                                src={item.post?.img}
                                alt=""
                              />
                              <div className="absolute md:top-[70%] sm:top-[40%]  flex  flex-col left-5 z-50 text-left space-y-2">
                                <span className="bg-primary w-fit text-white px-2 block py-0.5 font-medium">
                                  {item.post?.category?.name}
                                </span>
                                <span className="block text-white font-bold text-xl">
                                  {item.post?.title}
                                </span>
                                <span className="block text-white font-bold text-lg">
                                  {item.post?.created_at}
                                </span>
                              </div>
                            </a>
                          </Link>
                        );
                      }
                    })}
                    <div className="grid md:grid-rows-2 gap-2">
                      {slider.items.map((item) => {
                        if (item.position === "rt") {
                          return (
                            <Link href={`/preview?post=${item.post?.slug}`}>
                              <a
                                key={item.post?.id}
                                className=" h-[244px]  relative  news-item-1"
                              >
                                <div className="absolute bg-black/40 w-full h-full z-40"></div>

                                <img
                                  className="h-[244px] w-full bg-cover"
                                  src={item.post?.img}
                                  alt=""
                                />
                                <div className="absolute top-[40%] flex  flex-col left-5 z-50 text-left space-y-2">
                                  <span className="bg-primary w-fit text-white px-2 block py-0.5 font-medium">
                                    {item.post?.category?.name}
                                  </span>
                                  <span className="block text-white font-bold text-xl">
                                    {item.post?.title}
                                  </span>
                                  <span className="block text-white font-bold text-lg">
                                    {item.post?.created_at}
                                  </span>
                                </div>
                              </a>
                            </Link>
                          );
                        }
                      })}
                      <div className="md:grid grid-cols-2 sm:hidden gap-2">
                        {slider.items.map((item) => {
                          if (item.position === "rbl") {
                            return (
                              <Link href={`/preview?post=${item.post?.slug}`}>
                                <a
                                  key={item.post?.id}
                                  className=" h-[244px] relative news-item-1"
                                >
                                  <div className="absolute bg-black/40 w-full h-full z-40"></div>
                                  <img
                                    className="h-full"
                                    src={item.post?.img}
                                    alt=""
                                  />
                                  <div className="absolute top-[25%] flex  flex-col left-5 z-50 text-left space-y-2">
                                    <span className="bg-primary w-fit text-white px-2 block py-0.5 font-medium">
                                      {item.post?.category?.name}
                                    </span>
                                    <span className="block text-white font-bold text-xl">
                                      {item.post?.title}
                                    </span>
                                    <span className="block text-white font-bold text-lg">
                                      {item.post?.created_at}
                                    </span>
                                  </div>
                                </a>
                              </Link>
                            );
                          }
                        })}
                        {slider.items.map((item) => {
                          if (item.position === "rbr") {
                            return (
                              <Link href={`/preview?post=${item.post?.slug}`}>
                                <a
                                  key={item.post?.id}
                                  className="  h-[244px] relative  news-item-1"
                                >
                                  <div className="absolute bg-black/40 w-full h-full z-40"></div>

                                  <img
                                    className="h-full"
                                    src={item.post?.img}
                                    alt=""
                                  />
                                  <div className="absolute top-[25%] flex  flex-col left-5 z-50 text-left space-y-2">
                                    <span className="bg-primary w-fit text-white px-2 block py-0.5 font-medium">
                                      {item.post?.category?.name}
                                    </span>
                                    <span className="block text-white font-bold text-xl">
                                      {item.post?.title}
                                    </span>
                                    <span className="block text-white font-bold text-lg">
                                      {item.post?.created_at}
                                    </span>
                                  </div>
                                </a>
                              </Link>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className="mt-[190px]">
          <Spinner className="w-20" />
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
