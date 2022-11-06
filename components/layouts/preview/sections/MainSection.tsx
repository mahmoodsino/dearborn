import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import {
  getPost,
  MostReadAtom,
  NewsCardType,
  NextPostAtom,
  PostType,
  PrevPostAtom,
} from "../../../../helper";
import { Spinner } from "../../../spinner";
import CategoryPageCard from "../../category/elements/CategoryPageCard";
import { SmallCard } from "../../home/elemnts";
import { NextArticle, PrevArticle } from "../elements";
import ShareSocialMedia from "./ShareSocialMedia";
import Parser from "react-html-parser";

const MainSection = () => {
  const { locale } = useRouter();
  const [mostRead, setMostRead] = useRecoilState(MostReadAtom);
  const { query, asPath } = useRouter();
  const [nextPost, setNextPost] = useRecoilState(NextPostAtom);
  const [PrevPost, setPrevPost] = useRecoilState(PrevPostAtom);
  const [post, setPost] = useState<PostType>({} as PostType);
  const [relatedPosts, setRelatedPosts] = useState<NewsCardType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (typeof query.post === "string") {
        const res = await getPost(query.post);
        if (res === null) {
          toast.error("some thing went wrong");
        } else {
          setNextPost(res.result.next_post);
          setPrevPost(res.result.prev_post);
          setPost(res.result.post);
          setRelatedPosts(res.result.related_posts);
        }
      }
      setLoading(false);
    };
    getData();
  }, [query.post]);

  return (
    <div>
      {!loading ? (
        <div className="mt-[140px] px-2">
          <div className="flex justify-between py-10 ">
            <div className="lg:w-[67%] md:w-[1005]">
              <div className="leading-tight">
                <div className="space-x-2">
                  {post?.categories?.map((item,i) => {
                    return (
                      <span key={i} className="text-sm text-white bg-primary px-2 py-0.5">
                        {item.name}
                      </span>
                    );
                  })}
                </div>
                <h2 className="text-[30px] font-bold text-[#222]">
                  {post.title}
                </h2>
                <h2 className="text-[15px] text-[#9999] mt-2 ">
                  {post.created_at}
                </h2>
              </div>
              <ShareSocialMedia />
              <div className="text-textgray text-[17px] my-5">
                <img src={post.img} alt="" />
                <div className="preview">{Parser(post?.description)}</div>
              </div>
              <ShareSocialMedia />
              <div className="grid md:grid-cols-2 mt-5 ">
                <NextArticle />
                <PrevArticle />
              </div>
              <div className="w-[100%] mt-10">
                <div className="flex justify-between border-b-2 border-b-primary">
                  <div></div>
                  {locale === "en" ? (
                    <button className="bg-primary text-white font-medium px-4 py-3 ">
                      RELATED NEWS
                    </button>
                  ) : (
                    <button className="bg-primary text-white font-bold px-4 py-3 ">
                      اخبار مشابهة
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 mt-5 gap-4">
                  {relatedPosts.map((item, i) => {
                    return <CategoryPageCard key={i} post={item} />;
                  })}
                </div>
              </div>
            </div>
            <div className="w-[30%] sm:hidden lg:block relative ">
              <div className="top-[135px] sticky">
                <div className="flex justify-between border-b-2 border-b-primary">
                  <div></div>
                  {locale === "en" ? (
                    <button className="bg-primary text-white font-medium px-4 py-3 ">
                      MUST READ
                    </button>
                  ) : (
                    <button className="bg-primary text-white font-bold px-4 py-3 ">
                      اخترنا لك
                    </button>
                  )}
                </div>
                <div className="mt-5 space-y-3">
                  {mostRead.map((item, i) => {
                    return (
                      <SmallCard key={i} textWhite="text-black" post={item} />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-[240px]">
          <Spinner className="w-32" />
        </div>
      )}
    </div>
  );
};

export default MainSection;
