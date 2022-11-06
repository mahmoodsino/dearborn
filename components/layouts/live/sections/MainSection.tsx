import React, { useEffect, useState } from "react";
import getLiveFacebook from "../../../../helper/server/live-facebook/service";
import { dataType, liveFacebookType } from "../../../../helper";
import { toast } from "react-toastify";
import { Spinner } from "../../../spinner";
import { VideoIcon } from "../../../icons";
import { useRecoilState } from "recoil";
import LiveModal, { LiveModaAtom } from "./LiveModal";

const MainSection = () => {
  const [live, setLive] = useState<liveFacebookType>({} as liveFacebookType);
  const [liveVid, setliveVid] = useState<dataType[]>([]);
  const [newData, setNewData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);
  const [openLiveModal, setOpenLiveModal] = useRecoilState(LiveModaAtom);
  const [frame, setFrame] = useState<string>("");

  useEffect(() => {
    setPageLoad(true);
    const getData = async () => {
      const res = await getLiveFacebook(null);
      if (res === null) {
        toast.error("some thing went wrong");
        setPageLoad(false);
      } else {
        setLive(res);
        setliveVid(res.data);
        setPageLoad(false);
      }
    };
    getData();
  }, []);

  const hanelLoadMore = async () => {
    setLoading(true);
    const res = await getLiveFacebook(live?.next_url);
    if (res === null) {
      toast.error("some thing wrong");
      setLoading(false);
    } else {
      setLive(res);
      setNewData(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    newData.map((data) => {
      setliveVid((prev) => {
        return [...prev, data];
      });
    });
  }, [newData]);

  const handelVedio = (fram: string) => {
    setFrame(fram);
    setOpenLiveModal(true);
  };

  useEffect(() => {
    if (openLiveModal === false) {
      setFrame("");
    }
  }, [openLiveModal]);

  return (
    <div className="mt-[150px]">
      {!pageLoad ? (
        <div>
          <h1 className="text-[35px] font-bold text-primary text-center">
            Live videos on Facebook
          </h1>
          <div className="grid md:grid-cols-2 mt-5 gap-7 overflow-hidden ">
            {liveVid?.map((live, i) => {
              return (
                <div
                  key={i}
                  className={`col-span-1 relative img-box ${
                    live.status === "LIVE" && "border border-red-700"
                  } `}
                >
                  {live.status === "LIVE" && (
                    <span className="px-5 py-0.5 absolute text-white bg-red-700  z-50">
                      LIVE NOW
                    </span>
                  )}
                  <button
                    onClick={() => handelVedio(live.embed_html)}
                    className=" border video-box relative"
                  >
                    <VideoIcon className="md:w-14 sm:w-10 top-0 left-0 right-0 bottom-0 m-auto  z-50 absolute text-white" />
                    <img src={live.video.picture} alt="" />
                    <div className="absolute top-0 bg-black/50 w-full h-full z-40"></div>
                  </button>
                  <div className="px-3 mt-2">
                    <span className="block text-[15px] text-[#999999]">
                      {live?.creation_time}
                    </span>
                    <h2 className="text-lg text-[#333] font-semibold">
                      {live?.description}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center my-5 ">
            {live?.has_next && (
              <button
                disabled={loading ? true : false}
                onClick={() => hanelLoadMore()}
                className="bg-[#f5c516] text-sm text-white w-[116px] py-2 rounded-md"
              >
                {!loading ? (
                  <span>LOAD MORE</span>
                ) : (
                  <Spinner className="w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        <Spinner className="w-28" />
      )}
      <LiveModal iframe={frame} />
    </div>
  );
};

export default MainSection;
