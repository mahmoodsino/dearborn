import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { ExclusiveType } from "../../../../helper";
import { VideoIcon } from "../../../icons";
import { ExclusiverebortAtom } from "../sections/ExclusiveReports";


interface Props {
  posts :ExclusiveType
}

const ExclusiveCard = ({posts}:Props) => {
  const [exclusiveRebort,setExclusiveRebort]=useRecoilState(ExclusiverebortAtom)

  const {locale}=useRouter()
  return (
    <button onClick={() => setExclusiveRebort(posts?.video)} className=" flex flex-col">
      <div className="  relative ">
        <div className="absolute bg-black/20 w-full h-full z-40"></div>
        <VideoIcon className="sm:w-10 md:w-14  absolute top-0 right-0 left-0 bottom-0 m-auto text-white" />
        <img
        style={{objectFit:"cover"}}
          className=" sm:h-[180px] md:w-full md:h-[300px] lg:h-[180px] "
          src={posts?.img}
          alt=""
        />
        <span className="block absolute bottom-0 sm:text-xs md:text-base  text-white bg-primary px-1 py-1 ">
          {posts?.category?.name}
        </span>
      </div>
      <span className={`block sm:text-sm md:text-lg font-medium mt-2 ${locale==="en" ?"text-left" : "text-right"}`}>
        {posts?.title}
      </span>
    </button>
  );
};

export default ExclusiveCard;
