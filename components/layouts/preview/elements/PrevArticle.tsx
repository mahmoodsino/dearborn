import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { PrevPostAtom } from "../../../../helper";

const PrevArticle = () => {
  const { locale } = useRouter();
  const [PrevPost, setPrevPost] = useRecoilState(PrevPostAtom);

  return (
    <Link href={`/preview?post=${PrevPost?.slug}`}>
      <a
        className={`flex  space-x-3 news-item-3 ${
          locale === "en" ? "text-left" : "text-right "
        }`}
      >
        <img
          className="h-[80px] w-[80px]"
          style={{ objectFit: "contain" }}
          src={PrevPost?.img}
          alt=""
        />
        <div className={`${locale === "ar" && "pr-3"}`}>
          <span className="text-[#9999] text-[17px]">PREVIOUS ARTICLE</span>
          <h1 className="text-[#333] text-[17px] font-bold w-full">
            {PrevPost?.title}
          </h1>
        </div>
      </a>
    </Link>
  );
};

export default PrevArticle;
