import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { atom, useRecoilState } from "recoil";
import {
  ExclusiveType,
  getExclusives,
  MostReadAtom,
  NewsCardType,
} from "../../../../helper";
import { Spinner } from "../../../spinner";
import { SmallCard } from "../../home/elemnts";
import { ExlusiveMainCard, ExlusiveSecoundaryCard } from "../elements";
import Paginations from "./Paginations";
import YoutubeModal from "./YoutubeModal";

export const ExclusevpageRepotrtAtom = atom({
  key: "ExclusevpageRepotrtAtom",
  default: "",
});


const MainSection = () => {
  const { locale,query,replace } = useRouter();
  const [mostRead, setMostRead] = useRecoilState(MostReadAtom);
  const [exclusive, setExclusives] = useState<ExclusiveType[]>([]);
  const [bigCard, setBigCard] = useState<ExclusiveType[]>([]);
  const [smallCard, setSmallCard] = useState<ExclusiveType[]>([]);
  const [exclusivePageReborts, setExclusivePageReborts] = useRecoilState(
    ExclusevpageRepotrtAtom
  );
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(typeof(query.page) !== "undefined"){
      setCurrentPage(+(query.page))
    }
  },[query.page])

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getExclusives(`?page=${currentPage}`);
      if (res === null) {
        toast.error("some thing went wrong");
        setLoading(false);
      } else {
        setExclusives(res.result.exclusive);
        setTotalPages(res.result.pages_count);
        setLoading(false);
      }
    };
    getData();
  }, [currentPage]);

  useEffect(() => {
    let cloneArray = [...exclusive];
    let firstHalf = cloneArray.splice(0, 2);
    setBigCard(firstHalf);
    let SecoundHalf = cloneArray.splice(0, exclusive.length);
    setSmallCard(SecoundHalf);
  }, [exclusive]);

  const paginate = (pageNumber: number) => {
    replace(
      {query: { ...query, page:pageNumber }},
      undefined,
      {scroll: true,}
    );
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {!loading ? (
        <div>
          <div className="mt-[150px] px-2">
            <div className="grid gap-2 md:grid-cols-2 py-10">
              {bigCard.map((item, i) => {
                return <ExlusiveMainCard key={i} posts={item} />;
              })}
            </div>
            <div className="flex justify-between py-10 ">
              <div className="lg:w-[69%] md:w-[100%]">
                <div className="flex justify-between border-b-2 border-b-secoundary">
                  <div></div>
                  {locale === "en" ? (
                    <button className="bg-secoundary text-white font-medium px-4 py-3 ">
                      EXCLUSIVE REPORTS
                    </button>
                  ) : (
                    <button className="bg-secoundary text-lg text-white font-bold px-4 py-3 ">
                      تقارير حصرية
                    </button>
                  )}
                </div>
                <div>
                  <div className="grid md:grid-cols-2 gap-7 mt-5 ">
                    {smallCard.map((item, i) => {
                      return <ExlusiveSecoundaryCard key={i} posts={item} />;
                    })}
                  </div>
                  <div className="w-full">
                    <Paginations
                      currentPage={currentPage}
                      totalPages={totalPages}
                      paginate={paginate}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-[29%] sm:hidden lg:block 2xl:w-[30%] relative ">
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
                  <div className="mt-5 space-y-3 ">
                    {mostRead.map((item, i) => {
                      return (
                        <SmallCard key={i} textWhite="text-black" post={item} />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <YoutubeModal />
        </div>
      ) : (
        <div className="mt-[150px]">
          <Spinner className="w-28 mt-[150px]" />
        </div>
      )}
    </div>
  );
};

export default MainSection;
