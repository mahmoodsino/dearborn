import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getMostPopular, MostPupularAtom } from "../../../../helper";
import { PopularCard } from "../elemnts";
import { toast } from "react-toastify";

const MostPupular = () => {
  let { locale } = useRouter();
  const [mostPopular, setMostPopular] = useRecoilState(MostPupularAtom);

  useEffect(() => {
    const getData = async () => {
      const res = await getMostPopular();
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setMostPopular(res.result.posts);
      }
    };
    getData();
  }, []);

  return (
    <div className="py-5">
      <div className="flex justify-between border-b-2 border-b-primary">
        <div></div>
        <button className="bg-primary text-white font-medium px-4 py-3 ">
          {locale === "en" ? (
            <span>MOST POPULAR</span>
          ) : (
            <span className="font-bold">الأكثر تداولاً</span>
          )}
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-5 text-left">
        {mostPopular.map((item, i) => {
          return (
            <PopularCard
              key={i}
              post={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MostPupular;
