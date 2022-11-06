import { atom } from "recoil";
import { NewsCardType } from "../../type";

const MostReadAtom  = atom<NewsCardType[]>({
    key:"MostReadAtom",
    default:[]
})

export default MostReadAtom