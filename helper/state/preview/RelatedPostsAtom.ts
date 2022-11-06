import { atom } from "recoil";
import { NewsCardType } from "../../type";

const RelatedPostsAtom = atom<NewsCardType[]>({
    key:"RelatedPostsAtom",
    default:[]
})

export default RelatedPostsAtom