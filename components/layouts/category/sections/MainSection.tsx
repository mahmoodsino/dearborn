import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { atom, useRecoilState } from "recoil";
import {
  CategoriesType,
  getNewsOfCategory,
  MostReadAtom,
  NewsCardType,
} from "../../../../helper";
import { selectedCAtegoryAtom } from "../../../header/Categories";
import { Spinner } from "../../../spinner";
import { SmallCard } from "../../home/elemnts";
import CategoryPageCard from "../elements/CategoryPageCard";
import Paginations from "./Paginations";


const MainSection = () => {
  const { locale,replace } = useRouter();
  const [mostRead, setMostRead] = useRecoilState(MostReadAtom);
  const { query } = useRouter();
  const [news, setNews] = useState<NewsCardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCAtegoryAtom)


 


  

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (typeof query.category === "string") {
        const res = await getNewsOfCategory(query.category,currentPage);
        if (res === null) {
          toast.error("some thing went wrong");
        } else {
          setNews(res.result.posts);
          setTotalPages(res.result.pages_count);
        }
      }
      setLoading(false);
    };
    getData();
  }, [query.category, currentPage]);


  useEffect(() => {
    const leave = () => {
      setSelectedCategory({} as CategoriesType)
    };
    return () => {
      leave();
    };
  }, []);

  const paginate = (pageNumber: number) => {
    replace(
      {query: { ...query, page:pageNumber }},
      undefined,
      {scroll: true,}
    );
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if(news.length!==0){
      setSelectedCategory(news[0].category)
    }
  },[news])



  return (
    <div className="mt-[150px] px-2">
      <h1 className="md:text-[50px] sm:text-2xl font-bold text-primary">
      {selectedCategory.name}
      </h1>
      <h2 className="md:text-[17px] text-[#333] mt-5">
        {selectedCategory.description}
      </h2>
      <div className="flex justify-between py-10 ">
        <div className="lg:w-[67%] md:w-[100%]">
          <div style={{borderBottom:`2px solid ${selectedCategory.color}`}} className={`flex justify-between `}>
            <div></div>
            {locale === "en" ? (
              <button style={{backgroundColor:`${selectedCategory.color}`}} className=" text-white font-medium px-4 py-3 ">
                {selectedCategory.name}
              </button>
            ) : (
              <button className="bg-primary text-lg text-white font-semibold px-4 py-3 ">
               {selectedCategory.name}
              </button>
            )}
          </div>
          {!loading ? (
            <div className="">
              <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-2  gap-3">
                {news.map((item, i) => {
                  return <CategoryPageCard key={i} post={item} />;
                })}
              </div>
              <div className="w-full">
                <Paginations currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
              </div>
            </div>
          ) : (
            <Spinner className="w-24" />
          )}
        </div>
        <div className="w-[30%] sm:hidden lg:block relative ">
          <div className="top-[135px] sticky">
            <div className="flex justify-between border-b-2 border-b-primary">
              <div></div>
              {locale === "en" ? (
                <button className="bg-primary text-white font-medium px-4 py-3 ">
                  MUST READ
                </button>
              ) : (
                <button className="bg-primary text-white font-bold px-4 py-3 ">
                  اخترنا لك
                </button>
              )}
            </div>
            <div className="mt-5 space-y-3">
              {mostRead.map((item, i) => {
                return <SmallCard key={i} textWhite="text-black" post={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
