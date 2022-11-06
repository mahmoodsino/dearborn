import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { CloseIcon } from "../../../icons";
import { Spinner } from "../../../spinner";
import { ExclusevpageRepotrtAtom } from "./MainSection";

export const YoutubeModaAtom = atom({
  key: "YoutubeModaAtom",
  default: false,
});

const YoutubeModal = () => {
  const [openYoutubeModal, setOpenYoutubeModal] =
    useRecoilState(YoutubeModaAtom);
  const [exclusivePageReborts, setExclusivePageReborts] = useRecoilState(
    ExclusevpageRepotrtAtom
  );

  useEffect(() => {
    if (openYoutubeModal === false) {
      setExclusivePageReborts("");
    }
  }, [openYoutubeModal]);

  return (
    <div>
      <>
        <div
          className={`${
            openYoutubeModal ? "opacity-100 visible" : "opacity-0 invisible"
          } inset-0   w-[98%] h-[98%]  left-0 right-0 top-0 bottom-0 m-auto shadow-lg z-[200] fixed transition-all duration-500 ease-in-out`}
        >
          <div className={`absolute top-[200px] bottom-0 left-0 right-0 m-auto -z-10 ${openYoutubeModal ? "block" : "hidden"}`}>
          <Spinner className="w-32" />
          </div>
          <div
            className="flex justify-end z-20"
            onClick={() => setOpenYoutubeModal(false)}
          >
            <button className="flex justify-end w-fit">
              <CloseIcon className="w-12 text-red-700 " />
            </button>
          </div>
          <iframe
            className=" w-[100%] h-[90%] z-20"
            src={exclusivePageReborts}
            title="description"
          ></iframe>
        </div>
        {openYoutubeModal ? (
          <div className="opacity-60 fixed inset-0 z-[190] bg-black "></div>
        ) : null}
      </>
    </div>
  );
};
export default YoutubeModal;
