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

const ExlusiveMainCard = ({posts}:Props) => {
  const {locale}=useRouter()
  const [openYoutubeModal,setOpenYoutubeModal]=useRecoilState(YoutubeModaAtom)
  const [exclusivePageReborts,setExclusivePageReborts]=useRecoilState(ExclusevpageRepotrtAtom)

  return (
    <button onClick={() => (setExclusivePageReborts(posts?.video),setOpenYoutubeModal(true))} className={`news-item-2   relative  ${locale ==="en" ? "text-left" : "text-right"}`}>
      <VideoIcon className="md:w-14 sm:w-10 top-0 left-0 right-0 bottom-0 m-auto  z-50 absolute text-white" />
      <img
      style={{objectFit:"cover"}}
      className="h-[100%]"
        src={posts?.img}
        alt=""
      />
      <div className="absolute top-0 bg-black/50 w-full h-full z-40"></div>
      <div className="bottom-5 absolute z-50 px-5">
        <span className=" bg-primary sm:text-xs md:text-base text-white px-2 py-1 block w-fit font-semibold text-xl">
          {posts?.category?.name}
        </span>
        <span className="text-white md:text-lg font-bold block mt-2">
          {posts?.title}
        </span>
        <span className="block mt-3 text-white md:text-lg font-bold">
          {posts?.created_at}
        </span>
      </div>
    </button>
  );
};

export default ExlusiveMainCard;
