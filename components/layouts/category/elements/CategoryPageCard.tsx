import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { NewsCardType } from "../../../../helper";

interface Props {
  post: NewsCardType;
}

const CategoryPageCard = ({ post }: Props) => {
  const { locale } = useRouter();

  return (
    <Link href={`/preview?post=${post?.slug}`}>
      <a
        className={`text-left mb-8 w-[100%] ${
          locale === "en" ? "text-left" : "text-right"
        }`}
      >
        <div className="relative w-fit">
          <img
            className="lg:h-[250px]"
            style={{ objectFit: "cover" }}
            src={post?.img ?  post.img : "/alternative.png"}
            alt=""
          />
          <span className={`bottom-0 absolute sm:text-xs md:text-base bg-primary  text-white px-2 z-50 py-1 text-lg whitespace-nowrap `}>
            {post?.category?.name}
          </span>
        </div>
        <span className="md:text-[18px] font-medium text-[#222222]">
          {post?.title}
        </span>
      </a>
    </Link>
  );
};

export default CategoryPageCard;
