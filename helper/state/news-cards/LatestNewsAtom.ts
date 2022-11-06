import { atom } from "recoil";
import { NewsCardType } from "../../type";

const LatestNewsAtom = atom<NewsCardType[]>({
    key:"LatestNewsAtom",
    default:[]
})

export default LatestNewsAtom