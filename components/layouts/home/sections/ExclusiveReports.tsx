import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { atom, useRecoilState } from "recoil";
import { ExclusivesAtom, getExclusives } from "../../../../helper";
import { Spinner } from "../../../spinner";
import { ExclusiveCard } from "../elemnts";

export const ExclusiverebortAtom = atom({
  key: "ExclusiverebortAtom",
  default: "",
});

const ExclusiveReports = () => {
  let { locale } = useRouter();
  const [exclusives, setExclusives] = useRecoilState(ExclusivesAtom);
  const [exclusiveRebort, setExclusiveRebort] =
    useRecoilState(ExclusiverebortAtom);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getExclusives("?page_size=4");
      if (res === null) {
        setLoading(false);
        toast.error("some thing went wrong");
      } else {
        setExclusives(res.result.exclusive);
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setExclusiveRebort(exclusives[0]?.video);
  }, [exclusives]);

  return (
    <div className="py-10">
      <div className="flex justify-between border-b-2 border-b-primary">
        <div></div>
        <button className="bg-primary text-white font-medium px-4 py-3 ">
          {locale === "en" ? (
            <span>EXCLUSIVE REPORTS</span>
          ) : (
            <span className="font-bold">تقارير حصرية</span>
          )}
        </button>
      </div>
      {!loading ? (
        <div>
          <iframe
            className=" w-full sm:h-[360px] md:h-[550px] mt-2"
            src={exclusiveRebort}
            title="description"
          ></iframe>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5  ">
            {exclusives.map((item, i) => {
              return <ExclusiveCard key={i} posts={item} />;
            })}
          </div>
        </div>
      ) : (
        <Spinner className="w-28" />
      )}
    </div>
  );
};

export default ExclusiveReports;
