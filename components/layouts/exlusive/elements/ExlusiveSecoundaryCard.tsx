import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { ExclusiveType } from "../../../../helper";
import { VideoIcon } from "../../../icons";
import { ExclusevpageRepotrtAtom } from "../sections/MainSection";
import { YoutubeModaAtom } from "../sections/YoutubeModal";


interface Props {
 posts:ExclusiveType
}

const ExlusiveSecoundaryCard = ({posts}:Props) => {
  const [exclusivePageReborts,setExclusivePageReborts]=useRecoilState(ExclusevpageRepotrtAtom)
  const [openYoutubeModal,setOpenYoutubeModal]=useRecoilState(YoutubeModaAtom)
  

  const {locale}=useRouter()
  return (
    <button onClick={() => (setExclusivePageReborts(posts?.video),setOpenYoutubeModal(true))} className={` w-[100%] flex flex-col ${locale === "en" ? "text-left" : "text-right"}`}>
      <div className="relative w-fit">
        <img
          className="lg:w-[335px] h-[223px]"
          style={{ objectFit: "cover" }}
          src={posts?.img}
          alt=""
        />
        <VideoIcon className="absolute w-14 text-white top-0 left-0 right-0 bottom-0 m-auto z-50" />
        <div className="absolute top-0 bg-black/50 w-full h-full z-40"></div>
        <span className="bottom-0 sm:text-xs md:text-base whitespace-nowrap absolute bg-primary text-white px-2 z-50 py-1 text-lg">
          {posts?.category?.name}
        </span>
      </div>
      <span className="lg:text-[20px] block w-fit font-medium text-[#222222]">
       {posts?.title}
      </span>
    </button>
  );
};

export default ExlusiveSecoundaryCard;
