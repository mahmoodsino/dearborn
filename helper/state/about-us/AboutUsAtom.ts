import { atom } from "recoil";
import { AboutType } from "../../type";

const AboutUsAtom =atom<AboutType>({
    key:"AboutUsAtom",
    default:{
        left_youtube_link: "",
        right_youtube_link: "",
        top_text: "",
        bottom_text: "",
        facebook_link: "",
        instagram_link: "",
        youtube_link: "",
        twitter_link: "",
        img_about: "",
        footer_text:""
      }
})

export default AboutUsAtom