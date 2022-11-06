import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { NewsCardType } from "../../../../helper";

interface Props {
  textWhite?: string,
  post:NewsCardType
}



const SmallCard = ({textWhite,post}:Props) => {


  let { locale } = useRouter();
  const {push}=useRouter()

  const getToPreviw = (slug:string) => {
    push({
      pathname: "/preview",
      query: { post: encodeURI(slug) },
    });
  }


  return (
    <Link href={`/preview?post=${post?.slug}`}>
      <a onClick={() => getToPreviw(post?.slug)} className={`sm:w-full flex ${locale==="en" ? "text-left" : "text-right"} `} >
        <img
          style={{objectFit:"cover"}}
          className="w-[120px] h-[85px]"
          src={post?.img}
          alt=""
        />
        <div className={`${locale ==="en" ? "ml-3" : "mr-3"}`} >
          <span className={`  leading-[1.1] line-clamp222 font-medium md:text-lg block w-full  ${textWhite ? textWhite : "text-black"} `}>
            {post?.title}
          </span>
          <span className="md:text-sm sm:text-xs text-gray1 block mt-2">{post?.created_at}</span>
        </div>
      </a>
    </Link>
  );
};

export default SmallCard;
