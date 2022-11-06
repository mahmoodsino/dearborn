import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { NewsCardType } from "../../../../helper";

interface Props {
  post: NewsCardType;
}

const PopularCard = ({ post }: Props) => {
  const { locale } = useRouter();
  const { push } = useRouter();


  return (
    <Link href={`/preview?post=${post?.slug}`}>
      <a
        className={`flex h-fi ${locale === "en" ? "text-left" : "text-right"}`}
      >
        <img
          style={{ objectFit: "cover" }}
          className="md:w-[33%] lg:w-[55%] sm:w-[40%]  h-full"
          src={post?.img}
          alt=""
        />
        <div className={`${locale === "en" ? "ml-3" : "mr-3"}`}>
          <span className="line-clamp block  md:text-[25px] font-medium leading-tight">
            {post?.title}
          </span>
          <span className="block  text-gray1 sm:text-sm md:text-base  mt-1">
            {post?.created_at}
          </span>
          <span className=" block sm:text-sm md:text-[14] ">
            {post?.short_description}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default PopularCard;
