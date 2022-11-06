import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { NewsCardType } from "../../../../helper";
import { selectedCAtegoryAtom } from "../../../header/Categories";

interface Props {
  post: NewsCardType;
}

const CategoryPageCard = ({ post }: Props) => {
  const { locale } = useRouter();
  const { push } = useRouter();
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCAtegoryAtom)

  return (
    <Link href={`/preview?post=${post?.slug}`}>
      <a
        className={`text-left w-[100%] ${
          locale === "en" ? "text-left" : "text-right"
        }`}
      >
        <div className="relative w-fit">
          <img
            className="lg:h-[250px]"
            style={{ objectFit: "cover" }}
            src={post?.img}
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
