import React, { useEffect } from "react";
import Pagination from "react-js-pagination";

interface Props {
  paginate: (num: number) => void;
  totalPages:number
  currentPage:number
}

const Paginations = ({ paginate,currentPage,totalPages }: Props) => {
  return (
    <div className=" mt-10  ">
      <Pagination
        innerClass="flex justify-center text-xl flex-shrink-0 "
        itemClass="  cursor-pointer  flex-shrink-0  sm:py-1 sm:px-2 border hover:bg-primary hover:text-white sm:text-sm  duration-300 "
        activeClass="bg-primary text-white"
        itemClassFirst="border  "
        itemClassPrev="border "
        activePage={currentPage}
        itemsCountPerPage={25}
        totalItemsCount={25 * totalPages}
        pageRangeDisplayed={5}
        onChange={paginate.bind(this)}
      />
    </div>
  );
};

export default Paginations;
