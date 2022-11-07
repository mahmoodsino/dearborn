import React, { ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Fotter, Navbar } from "../components";
import "../helper/locales/i18n";
import "../styles/globals.css";
import { RecoilRoot, useRecoilState } from "recoil";
import Sidbar from "../components/sidbar/Sidbar";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import {
  AboutUsAtom,
  countFacebookAtom,
  countInstaAtom,
  countTwitterAtom,
  countYoutubeAtom,
  getAboutUs,
  getSocialCounter,
  LoadingFacebookAtom,
  LoadingInstaAtom,
  LoadingTwitterAtom,
  LoadingYoutubeAtom,
} from "../helper";
import { v4 as uuidv4 } from "uuid";

interface Props {
  children: ReactNode;
}
const App = ({ children }: Props) => {
  const [aboutUs, setAboutUs] = useRecoilState(AboutUsAtom);
  const [faceBook, SetFacebook] = useRecoilState(countFacebookAtom);
  const [insta, SetInsta] = useRecoilState(countInstaAtom);
  const [youTube, SetYoutube] = useRecoilState(countYoutubeAtom);
  const [titter, SetTwitter] = useRecoilState(countTwitterAtom);
  const [laodingFA, setLoadingFA] = useRecoilState(LoadingFacebookAtom);
  const [loadingTW, setLoadingTW] = useRecoilState(LoadingTwitterAtom);
  const [laodingYT, setLoadingYT] = useRecoilState(LoadingYoutubeAtom);
  const [laodingIN, setLoadingIN] = useRecoilState(LoadingInstaAtom);
  const [userToken, setUseToken] = useState("");

  useEffect(() => {
    const Token = localStorage.getItem("dearbornToken" || "");
    if (Token !== null) {
      setUseToken(Token);
    } else {
      localStorage.setItem("dearbornToken", uuidv4());
      console.log(uuidv4());
      
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await getAboutUs();
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setAboutUs(res.result);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setLoadingFA(true);
    setLoadingTW(true);
    setLoadingYT(true);
    setLoadingIN(true);
    const getData = async () => {
      const res = await getSocialCounter("fb");
      if (res !== null) {
        SetFacebook(res);
        setLoadingFA(false);
      }
      const res1 = await getSocialCounter("tw");
      if (res1 !== null) {
        SetTwitter(res1);
        setLoadingTW(false);
      }
      const res2 = await getSocialCounter("yt");
      if (res2 !== null) {
        SetYoutube(res2);
        setLoadingYT(false);
      }
      const res3 = await getSocialCounter("insta");
      if (res3 !== null) {
        SetInsta(res3);
        setLoadingIN(false);
      }
    };
    getData();
  }, []);

  return <div>{children}</div>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  if (typeof window !== "undefined") {
    if (typeof locale !== "undefined") {
      localStorage.setItem("lang", locale);
    }
  }

  return (
    <div >
      <RecoilRoot>
        <App>
          <Navbar />
          <div className="2xl:container sm:px-3 lg:px-40 2xl:px-56 mx-auto min-h-[60vh]">
            <Component {...pageProps} />
          </div>
          <Sidbar />
          <Fotter />
        </App>
        <ToastContainer />
      </RecoilRoot>
    </div>
  );
}

export default MyApp;
