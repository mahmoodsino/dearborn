import { atom } from "recoil";
import { NewsCardType } from "../../type";

 const PrevPostAtom = atom<NewsCardType>({
    key:"PrevPostAtom",
    default:{} as NewsCardType
 })

 export default PrevPostAtom