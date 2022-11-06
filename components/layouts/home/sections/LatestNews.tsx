import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  CategoriesAtom,
  CategoriesType,
  getLatestNews,
  LatestNewsAtom,
  NewsCardType,
} from "../../../../helper";
import { ArrowRightCircle } from "../../../icons";
import { LatsetCard, SmallCard } from "../elemnts";
import { toast } from "react-toastify";
import { Spinner } from "../../../spinner";

const LatestNews = () => {
  const [categories, setCategories] = useRecoilState(CategoriesAtom);
  const [latestNews, setLatestNews] = useRecoilState(LatestNewsAtom);
  const [bigCard, setBigCard] = useState<NewsCardType[]>([]);
  const [smallCard, setSmallCard] = useState<NewsCardType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoriesType>(
    {} as CategoriesType
  );
  const [loading, setLoading] = useState(false);
  let { locale,push } = useRouter();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (selectedCategory?.id) {
        const res = await getLatestNews(`&&categoryId=${selectedCategory?.id}`);
        if (res === null) {
          toast.error("some thing went wrong");
        } else {
          setLatestNews(res.result.posts);
        }
        setLoading(false);
      }
    };
    getData();
  }, [selectedCategory]);
  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);
  useEffect(() => {
    let cloneArray = [...latestNews];
    let firstHalf = cloneArray.splice(0, 3);
    setBigCard(firstHalf);
    let SecoundHalf = cloneArray.splice(0, 9);
    setSmallCard(SecoundHalf);
  }, [latestNews]);

  const handelCategory = () => {
    push({
      pathname: "/category",
      query: { category: encodeURI(selectedCategory?.slug) },
    });
  }

  return (
    <div>
      <div className=" flex justify-between mt-5 whitespace-nowrap">
        <div className={` overflow-x-auto border-b-2 text-sm border-b-primary w-full ${locale==="en" && "space-x-5"}`}>
          {categories.map((category, i) => {
            return (
              <button
                onClick={() => setSelectedCategory(category)}
                key={i}
                className={`uppercase ${
                  category.id === selectedCategory?.id && "text-[#00b342]"
                } ${locale === "ar" && "ml-7  text-[15px]"}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <button className="bg-primary text-white font-medium px-4 py-3 ">
          {locale === "en" ? (
            <span>LATEST NEWS</span>
          ) : (
            <span className="font-bold">آخر الأخبار</span>
          )}
        </button>
      </div>
      {!loading ? (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 my-5  gap-9">
            {bigCard.map((item, i) => {
              return (
                <LatsetCard
                  key={i}
                  post={item}
                />
              );
            })}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 px-3 gap-5 pt-5">
            {smallCard.map((item, i) => {
              return (
                <SmallCard
                  key={i}
                  post={item}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Spinner className="w-20 mt-10" />
      )}
      <div className="flex justify-end my-5">
        <button onClick={() => handelCategory()} className="mt-5 flex space-x-2 items-center hover:text-skyblue ">
          <ArrowRightCircle className="w-6 " />
          {locale === "en" ? (
            <span className="underline  text-lg">See More</span>
          ) : (
            <span className="underline  text-lg">المزيد</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default LatestNews;
