import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { CategoriesAtom, CategoriesType, getCategories } from "../../helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";


export const selectedCAtegoryAtom = atom<CategoriesType>({
  key:"selectedCAtegoryAtom",
  default:{} as CategoriesType
})

const Categories = () => {
  const [categories, setCategories] = useRecoilState(CategoriesAtom);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCAtegoryAtom)
  const push = useRouter().push;
  const { locale } = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await getCategories();
      if (res === null) {
        toast.error("some thing went wrong ");
      } else {
        setCategories(res.result.categories);
      }
    };
    getData();
  }, []);

  const handelCategory = (category: CategoriesType) => {
    setSelectedCategory(category);
  };

  return (
    <div className=" shadow-md bg-white">
      <div
        className={`2xl:container mx-auto lg:max-w-[95%] md:w-[100%]   text-sm overflow-x-auto flex sm:px-5   lg:justify-center ${
          locale === "en" && "space-x-7"
        } ${locale==="ar" && "tracking-wide "}`}
      >
        {categories.map((category, i) => {
          return (
            <Link  key={i} href={`/category?category=${category.slug}`}>
            
            <a
            style={category.id===selectedCategory.id ? {borderBottom:`4px solid ${selectedCategory.color}`,color:`${selectedCategory.color}`} : {}}
              onClick={() => handelCategory(category)}
              key={i}
              className={`font-bold   py-4  ${locale === "ar" && "ml-10"}`}
            >
              {category.name}
            </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
