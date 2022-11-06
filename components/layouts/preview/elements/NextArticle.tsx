import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { NextPostAtom } from "../../../../helper";

const NextArticle = () => {
  const {locale} = useRouter()
  const[nextPost,setNextPost]=useRecoilState(NextPostAtom)
  return (
    <Link  href={`/preview?post=${nextPost?.slug}`}>
      <a className={`flex  space-x-3 news-item-3 ${locale === "en" ? "text-left" :"text-right "}`}>
        <img
          className="h-[80px] w-[80px]"
          style={{ objectFit: "contain" }}
          src={nextPost?.img}
          alt=""
        />
        <div className={`${locale === "ar" && "pr-3"}`}>
          <span className="text-[#9999] text-[17px]">NEXT ARTICLE</span>
          <h1 className="text-[#333] text-[17px] font-bold w-full">
            {nextPost?.title}
          </h1>
        </div>
      </a>
    </Link>
  );
};

export default NextArticle;
