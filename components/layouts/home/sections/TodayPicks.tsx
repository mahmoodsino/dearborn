import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { getTodayPicks, NewsCardType, TodayPicksAtom } from "../../../../helper";
import { LatsetCard, SmallCard } from "../elemnts";

const TodayPicks = () => {
  const [todayPicks,setTodayPicks]=useRecoilState(TodayPicksAtom)
  let { locale } = useRouter();
  const [bigCard, setBigCard] = useState<NewsCardType[]>([]);
  const [smallCard, setSmallCard] = useState<NewsCardType[]>([]);


  useEffect(() => {
    const getData = async () => {
      const res = await getTodayPicks("&&page_size=4");
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setTodayPicks(res.result.posts);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    let cloneArray = [...todayPicks];
    let firstHalf = cloneArray.splice(0, 2);
    setBigCard(firstHalf);
    let SecoundHalf = cloneArray.splice(0, 4);
    setSmallCard(SecoundHalf);
  }, [todayPicks]);

  return (
    <div className="py-5">
      <div className="flex justify-between border-b-2 border-b-primary">
        <div></div>
        <button className="bg-primary text-white font-medium px-4 py-3 ">
          {locale==="en" ? <span>TODAY,S PICKS</span> :<span className="font-bold">مختارات اليوم</span>}
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 my-5 px-3 gap-5">
      {bigCard.map((item, i) => {
              return (
                <LatsetCard
                  key={i}
                 post={item}
                />
              );
            })}
        <div className="space-y-3 sm:col-span-2 lg:col-span-1 ">
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
    </div>
  );
};

export default TodayPicks;
