import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { CategoriesAtom, CategoriesType, getCategories } from "../../helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


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
    localStorage.setItem("categry",JSON.stringify(category))
    push({
      pathname: "/category",
      query: { category: encodeURI(category.slug) },
    });
  };

  return (
    <div className=" shadow-md bg-white">
      <div
        className={`2xl:container mx-auto lg:max-w-[95%]   text-sm overflow-x-auto flex md:justify-start lg:justify-center ${
          locale === "en" && "space-x-7"
        } ${locale==="ar" && "tracking-wide "}`}
      >
        {categories.map((category, i) => {
          return (
            <button
            style={category.id===selectedCategory.id ? {borderBottom:`4px solid ${selectedCategory.color}`,color:`${selectedCategory.color}`} : {}}
              onClick={() => handelCategory(category)}
              key={i}
              className={`font-bold   py-4  ${locale === "ar" && "ml-10"}`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
