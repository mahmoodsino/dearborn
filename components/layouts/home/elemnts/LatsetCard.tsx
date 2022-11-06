import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { NewsCardType } from "../../../../helper";

interface Props {
  post:NewsCardType
}

const LatsetCard = ({post}:Props) => {
  let { locale,push } = useRouter();

  return (
    <Link href={`/preview?post=${post?.slug}`}>
    <a  className={`${locale==="en" ? "text-left" : "text-right"}`}>
      <div className=" h-fit w-full relative">
        <img
        style={{objectFit:"cover"}}

          className="lg:h-[239px] sm:h-[139px]  w-full  "
          src={post?.img}
          alt=""
        />
        <span className="block absolute bottom-0 left-0. whitespace-nowrap sm:text-sm md:text-base text-white bg-primary px-1 py-1 ">
          {post?.category?.name}
        </span>
      </div>
      <span className={`block  sm:text-md md:text-lg font-medium mt-2 ${locale === "ar" && "font-semibold"}`}>
        {post?.title}
      </span>
      <span className="block sm:text-sm md:text-sm text-gray1  mt-1">
        {post?.created_at}
      </span>
      <span className={` block sm:hidden md:block sm:text-md  ${locale === "ar" && "text-base"}`}>
        {post?.short_description}
      </span>
    </a>

    </Link>
  );
};

export default LatsetCard;
